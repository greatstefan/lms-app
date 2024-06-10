import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
    return (
        <Link href="/teacher/create">
            <Button className="p-6">
                Curs nou
            </Button>
        </Link>
    );
}

export default CoursesPage;