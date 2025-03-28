import { FileQuestion } from "lucide-react";

interface IappProps {
	title: string,
	description: string
}

export default function NoCardItems({ description, title} : IappProps) {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
			<div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary opacity-30">
				<FileQuestion className="h-10 w-10 text-secondary" />
			</div>
			<h2 className="mt-6 text-xl font-semibold">{title}</h2>
			<p className="mt-2 text-center leading-6 text-muted-foreground">{description}</p>
		</div>
	)
}