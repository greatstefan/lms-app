import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";

const CourseIdPage = async ({
    params
}: {
    params: {
        courseId: string
    }
}) => {

    const { userId } = auth();

    if(!userId) {
        redirect("/");
        return null; // Prevents further execution
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        }
    });

    if(!course) {
        redirect("/");
        return null; // Prevents further execution
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        }
    });

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.categoryId
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold">Configurarea cursului</h1>
                    <span className="text-sm text-slate-700">
                        Completați toate câmpurile {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge size="sm" variant="success" icon={LayoutDashboard} />
                        <h2 className="text-xl">Personalizați-vă cursul</h2>
                    </div>
                    <TitleForm 
                        initialData={course}
                        courseId={course.id}
                    />
                    <DescriptionForm 
                        initialData={course}
                        courseId={course.id}
                    />
                    <ImageForm
                        initialData={course}
                        courseId={course.id}
                    />                    
                    <CategoryForm 
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
            </div>
        </div>
    );
}

export default CourseIdPage;