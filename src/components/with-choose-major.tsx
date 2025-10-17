import type { CollectionEntry } from "astro:content";
import { majorId as majorIdStore } from "@/stores.ts";
import { cn } from "@/utils.ts";
import { useStore } from "@nanostores/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  majors: CollectionEntry<"schoolMajor">["data"][];
}

export default function WithChooseMajor({
  majors,
  className,
  children,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  const majorId = useStore(majorIdStore);
  const [isChoosing, setIsChoosing] = useState<boolean>(false);
  const [grade, setGrade] = useState<number>();

  const currentMajor = useMemo(() => majors.find((item) => item.id === majorId), [majorId, majors]);

  useEffect(() => {
    if (currentMajor) {
      setGrade(currentMajor.grade);
    }
  }, [currentMajor]);

  const majorList = useMemo(
    () => (grade ? majors.filter((item) => item.grade === grade) : []),
    [grade, majors],
  );

  const setMajor = useCallback((id: string) => {
    majorIdStore.set(id);
    setIsChoosing(false);
  }, []);

  return (
    <div
      className={cn("border-amber indicator mt-6 w-full rounded-md border-1 p-4", className)}
      {...props}
    >
      {!currentMajor || isChoosing ? (
        <div className="flex items-center gap-5">
          <label className="flex items-center gap-2">
            <span className="label">年级</span>
            <input
              className="input input-ghost"
              type="number"
              placeholder="您的入学年份"
              value={grade ?? ""}
              onChange={(e) => setGrade(Number(e.target.value))}
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="label">选择专业</span>
            {majorList.length > 0 ? (
              <select
                className="select select-ghost"
                value={majorId}
                onChange={(e) => setMajor(e.target.value)}
              >
                <>
                  {!currentMajor && (
                    <option disabled value="">
                      未选择
                    </option>
                  )}
                  {majorList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </>
              </select>
            ) : (
              <div className="label text-sm">当前年级暂无专业记录</div>
            )}
          </label>
        </div>
      ) : (
        <>
          <button
            className="indicator-item indicator-top bg-base-100 text-base-content/30 hover:text-base-content/80 mr-14 cursor-pointer p-1 transition-colors duration-300"
            onClick={() => setIsChoosing(true)}
          >
            切换专业
          </button>
          <div className="indicator-item indicator-top indicator-center bg-base-100 w-min p-1">
            {currentMajor.name}
          </div>
          <div className="indicator-item indicator-top indicator-start bg-base-100 text-base-content/30 ml-14 p-1">
            课程信息
          </div>
          {children}
        </>
      )}
    </div>
  );
}
