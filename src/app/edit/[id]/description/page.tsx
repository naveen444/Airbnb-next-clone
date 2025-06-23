import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "@/app/components/Counter";
import { CreateBottomBar } from "@/app/components/CreateBottomBar";
import { editDescription, getMyHomeData } from "@/app/actions";
import Image from "next/image";

export default async function EditDescriptionPage({params}: {params: Promise<{id: string}>}) {
	const { id } = await params;
	const data = await getMyHomeData(id);

	return (
		<>
			<div className="container mx-auto mt-4 sm:mt-5 mb-10">
				<h2 className="text-xl sm:text-3xl font-semibold tracking-tight transition-colors">
					Please describe your home as good as you can!
				</h2>
			</div>

			<form action={editDescription}>
				<input type="hidden" name="homeId" value={id} />
				<div className="container mx-auto mt-4 sm:mt-5 flex flex-col gap-y-5 mb-36">
					<div className="w-full flex flex-wrap lg:flex-nowrap items-stretch justify-center gap-6 lg:gap-10">

						<div className="w-full h-full relative">
							<div className="relative h-[360px] sm:h-[540px] mb-6">
								<Image 
									src={`https://vtilkrpezfgpguifkvrk.supabase.co/storage/v1/object/public/images/${data?.photo}`} 
									alt="Image of Home"
									fill
									className="rounded-lg h-full object-cover w-full"
								/>
							</div>
						</div>
					
						<div className="w-full h-full relative flex flex-col gap-y-5">
							<div className="w-full flex flex-col gap-y-5">
								<div className="flex flex-col gap-y-2 ">
									<Label className="">Title</Label>
									<Input className="cursor-not-allowed" name="title" type="text" required placeholder="Short and simple..." value={data?.title as string} readOnly disabled />
								</div>

								<div className="flex flex-col gap-y-2">
									<Label className="">Description</Label>
									<Textarea name="description" required placeholder="Please describe your home..." defaultValue={data?.description as string} />
								</div>

								<div className="flex flex-col gap-y-2">
									<Label className="">Price</Label>
									<Input name="price" type="number" placeholder="Price per night in Rupees" required min={100} defaultValue={data?.price as number} />
								</div>

								<div className="flex flex-col gap-y-2">
									<Label>Image</Label>
									<Input name="image" type="file" required />
								</div>
							</div>

							<Card className="w-full">
								<CardHeader className="flex flex-col gap-y-5">
									<div className="w-full flex flex-col items-start justify-start">
										<h2 className="text-lg font-semibold">Previous values</h2>
										<div className="flex items-center justify-center gap-x-2 text-muted-foreground">
											<p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> * <p>{data?.bathrooms} Bathrooms</p>
										</div>
									</div>
									<div className="w-full flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Guests</h3>
											<p className="text-muted-foreground text-sm">How many guests do you want?</p>
										</div>
										<Counter name="guest" defaultAmount={Number(data?.guests ?? 0)} />
									</div>
									<div className="w-full flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Rooms</h3>
											<p className="text-muted-foreground text-sm">How many rooms do you have?</p>
										</div>
										<Counter name="room" defaultAmount={Number(data?.bedrooms ?? 0)} />
									</div>
									<div className="w-full flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Bathrooms</h3>
											<p className="text-muted-foreground text-sm">How many bathrooms do you have?</p>
										</div>
										<Counter name="bathroom" defaultAmount={Number(data?.bathrooms ?? 0)} />
									</div>
								</CardHeader>
							</Card>
						</div>
					</div>
				</div>

				<CreateBottomBar />
			</form>
		</>
	)
}