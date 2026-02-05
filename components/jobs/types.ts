export interface JobFilters {
    search?: string;
    location?: string;
    qualification?: string;
    jobType: string[];
    experience: string[];
    salaryRange: number;
    workMode: string[];
    keywords?: string;
    salaryRanges?: string[];
    jobRoles?: string[];
}
