import { majorId } from "@/stores.ts";
import { cn } from "@/utils.ts";
import { useStore } from "@nanostores/react";
import React from "react";

import type { CourseMetadata } from "@/types/metadata.ts";

interface Props {
  metadata: CourseMetadata;
}

export default function CourseInfo({
  metadata,
  className,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  const major_id = useStore(majorId);

  const attribute = metadata.attributes.find((item) => item.school_majors.includes(major_id));

  return (
    <div className={cn("", className)} {...props}>
      {attribute ? (
        <div>
          <span>成绩构成</span>
          {/*<img src="https://img.shields.io/badge/%E6%88%90%E7%BB%A9%E6%9E%84%E6%88%90-gold" />*/}
          <div className="flex gap-2">
            {attribute.score_components.map(({ name, percentage }) => (
              <img
                src={`https://img.shields.io/badge/${encodeURIComponent(name)}-${percentage}%25-wheat`}
                alt=""
              />
            ))}
          </div>
          <div></div>
        </div>
      ) : (
        <div>没有本课程的信息</div>
      )}
    </div>
  );
}
