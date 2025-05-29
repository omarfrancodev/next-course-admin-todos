import { WidgetItem } from "@/components";

export default function DashboardPage() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <WidgetItem
                title={"Title"}
                label={"Content"}
                subtitle={"Subtitle"} />
            <WidgetItem
                title={"Title"}
                label={"Content"}
                subtitle={"Subtitle"} />
        </div>
    );
}