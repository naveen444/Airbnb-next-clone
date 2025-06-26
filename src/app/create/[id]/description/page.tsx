import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "@/app/components/Counter";
import { CreateBottomBar } from "@/app/components/CreateBottomBar";
import { createDescription } from "@/app/actions";

export default async function DescriptionPage({params}: {params: Promise<{id: string}>}) {
	const { id } = await params;
	return (
		<>
			<div className="container mx-auto mt-4 sm:mt-5 mb-5">
				<h2 className="text-xl sm:text-3xl font-semibold tracking-tight transition-colors">
					Please describe your home as good as you can!
				</h2>
			</div>

			<form action={createDescription}>
				<input type="hidden" name="homeId" value={id} />
				<div className="container mx-auto mt-4 sm:mt-5 w-full flex flex-wrap lg:flex-nowrap items-stretch justify-center gap-6 lg:gap-10 pb-30">
						<div className="w-full flex flex-col gap-y-5">
							<div className="flex flex-col gap-y-2 ">
								<Label className="">Title</Label>
								<Input name="title" type="text" required placeholder="Short and simple..."/>
							</div>

							<div className="flex flex-col gap-y-2">
								<Label className="">Description</Label>
								<Textarea name="description" required placeholder="Please describe your home..." />
							</div>

							<div className="flex flex-col gap-y-2">
								<Label className="">Price</Label>
								<Input name="price" type="number" placeholder="Price per night in Rupees" required min={100} />
							</div>

							<div className="flex flex-col gap-y-2">
								<Label>Image</Label>
								<Input name="image" type="file" required />
							</div>
						</div>

						<Card className="w-full">
							<CardHeader className="flex flex-col gap-y-5">
								<div className="w-full flex items-center justify-between">
									<div className="flex flex-col">
										<h3 className="underline font-medium">Guests</h3>
										<p className="text-muted-foreground text-sm">How many guests do you want?</p>
									</div>
									<Counter name="guest" defaultAmount={0} />
								</div>
								<div className="w-full flex items-center justify-between">
									<div className="flex flex-col">
										<h3 className="underline font-medium">Rooms</h3>
										<p className="text-muted-foreground text-sm">How many rooms do you have?</p>
									</div>
									<Counter name="room" defaultAmount={0} />
								</div>
								<div className="w-full flex items-center justify-between">
									<div className="flex flex-col">
										<h3 className="underline font-medium">Bathrooms</h3>
										<p className="text-muted-foreground text-sm">How many bathrooms do you have?</p>
									</div>
									<Counter name="bathroom" defaultAmount={0} />
								</div>
							</CardHeader>
						</Card>
				</div>

				<CreateBottomBar />
			</form>
		</>
	)
}