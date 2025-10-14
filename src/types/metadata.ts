import { z } from "astro:content";

//
export const nationalMajor = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string(),
});
export type NationalMajor = z.infer<typeof nationalMajor>;

export const degreeType = z.enum(["本", "硕", "博"]);

export const schoolMajor = z.object({
  id: z.string(),
  name: z.string(),
  grade: z.number().int(),
  code: z.array(z.string()).min(1),
  degree_type: degreeType.default("本"),
});

export type SchoolMajor = z.infer<typeof schoolMajor>;

export const Grade = z.enum(["大一", "大二", "大三", "大四"]);

export const Semester = z.enum(["秋", "春", "夏"]);

export const GradeSemester = z.object({
  grade: Grade,
  semester: Semester,
});

export const GPAImpactType = z.enum(["核心权重", "核心扣分", "GPA"]);

export const ScoreComponent = z.object({
  name: z.string(),
  percentage: z.number().int().min(0).max(100),
});

export const courseAttribute = z.object({
  school_majors: z.array(z.string()).min(1),
  grade_semester_collection: z.array(GradeSemester).min(1),
  credit: z.number().min(0).optional(),
  class_hours: z.number().min(0).optional(),
  category: z.string(),
  gpa_impact_type: GPAImpactType.optional(),
  score_components: z.array(ScoreComponent).min(1),
});

export type CourseAttribute = z.infer<typeof courseAttribute>;

export const courseMetadata = z.object({
  id: z.string(),
  includes: z.array(z.string()).optional(),
  similars: z.array(z.string()).optional(),

  name: z.string(),
  alias: z.array(z.string()).optional(),

  attributes: z.array(courseAttribute).min(1),
});

export type CourseMetadata = z.infer<typeof courseMetadata>;
