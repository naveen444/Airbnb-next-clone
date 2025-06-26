"use server"

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";
import { ReservationStatus } from "@prisma/client";

type HomeType = {
	id: string;
	description: string | null;
	country: string | null;
	photo: string | null;
	price: number | null;
	Favourite: {
			userId: string | null;
			id: string;
			createdAt: Date;
			homeId: string | null;
	}[];
}

export async function createAirbnbHome({userId} : {userId: string}) {
	const data = await prisma.home.findFirst({
		where: {
			userId: userId
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	if(data === null) {
		const data = await prisma.home.create({
			data: {
				userId: userId
			}
		});

		return redirect(`/create/${data.id}/structure`);
	} else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
		return redirect(`/create/${data.id}/structure`);
	} else if (data.addedCategory && !data.addedDescription) {
		return redirect(`/create/${data.id}/description`);
	} else if (data.addedCategory && data.addedDescription && !data.addedLocation) {
		return redirect(`/create/${data.id}/address`);
	} else if (data.addedCategory && data.addedDescription && data.addedLocation) {
		const data = await prisma.home.create({
			data: {
				userId: userId
			}
		});

		return redirect(`/create/${data.id}/structure`);
	}
}

export async function createCategoryPage(formData: FormData) {
	const categoryName = formData.get('categoryName') as string;
	const homeId = formData.get('homeId') as string
	await prisma.home.update({
		where: {
			id: homeId
		},
		data: {
			categoryName: categoryName,
			addedCategory: true,
		}
	});

	return redirect(`/create/${homeId}/description`);
}

export async function editCategoryPage(formData: FormData) {
	const categoryName = formData.get('categoryName') as string;
	const homeId = formData.get('homeId') as string
	await prisma.home.update({
		where: {
			id: homeId
		},
		data: {
			categoryName: categoryName,
			addedCategory: true,
		}
	});

	return redirect(`/edit/${homeId}/description`);
}

export async function createDescription(formData: FormData) {
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const price = formData.get("price");
	const imageFile = formData.get("image") as File;
	const homeId = formData.get("homeId") as string;

	const guest = formData.get("guest") as string;
	const room = formData.get("room") as string;
	const bathroom = formData.get("bathroom") as string;

	const { data: imageData } = await supabase.storage
		.from("images")
		.upload(`${imageFile.name}-${new Date()}`, imageFile, {
			cacheControl: '2592000',
			contentType: 'image/png'
		});
	
	await prisma.home.update({
		where: {
			id: homeId,
		},
		data: {
			title: title,
			description: description,
			price: Number(price),
			bedrooms: room,
			bathrooms: bathroom,
			guests: guest,
			photo: imageData?.path,
			addedDescription: true,
		}
	});

	return redirect(`/create/${homeId}/address`);
}

export async function editDescription(formData: FormData) {
	const description = formData.get("description") as string;
	const price = formData.get("price");
	const imageFile = formData.get("image") as File;
	const homeId = formData.get("homeId") as string;

	const guest = formData.get("guest") as string;
	const room = formData.get("room") as string;
	const bathroom = formData.get("bathroom") as string;

	const { data: imageData } = await supabase.storage
		.from("images")
		.upload(`${imageFile.name}-${new Date()}`, imageFile, {
			cacheControl: '2592000',
			contentType: 'image/png'
		});
	
	await prisma.home.update({
		where: {
			id: homeId,
		},
		data: {
			description: description,
			price: Number(price),
			bedrooms: room,
			bathrooms: bathroom,
			guests: guest,
			photo: imageData?.path,
			addedDescription: true,
		}
	});

	return redirect(`/my-homes/home/${homeId}?updated=true`);
}

export async function createLocation(formData: FormData) {

	const homeId = formData.get("homeId") as string;
	const countryValue = formData.get("countryValue") as string;
	await prisma.home.update({
		where: {
			id: homeId
		},
		data: {
			addedLocation: true,
			country: countryValue
		}
	})

	return redirect(`/my-homes/home/${homeId}?created=true`);
}

export async function addtoFavourite(formData: FormData) {
	const homeId = formData.get("homeId") as string;
	const userId = formData.get("userId") as string;
	const pathName = formData.get("pathname") as string;

	await prisma.favourite.create({
		data: {
			homeId: homeId,
			userId: userId
		}
	});

	revalidatePath(pathName);
}

export async function removeFromFavourite(formData: FormData) {
	const favouriteId = formData.get("favouriteId") as string;
	const userId = formData.get("userId") as string;
	const pathName = formData.get("pathname") as string;

	await prisma.favourite.delete({
		where: {
			id: favouriteId,
			userId: userId,
		}
	});

	revalidatePath(pathName);
}

export async function createReservation(formData: FormData) {
	const userId = formData.get("userId") as string;
	const homeId = formData.get("homeId") as string;
	const startDate = formData.get("startDate") as string;
	const endDate = formData.get("endDate") as string;

	await prisma.reservation.create({
		data: {
			userId: userId,
			homeId: homeId,
			endDate: endDate,
			startDate: startDate,
		}
	});

	return redirect(`/reservations/home/${homeId}?confirmed=true`);
}

export async function userSetHomeInactive(formData: FormData) {
	const homeId = formData.get("homeId") as string;
	const userId = formData.get("userId") as string;
	const pathName = formData.get("pathname") as string;

	await prisma.home.update({
		where: { id: homeId, userId: userId },
		data: { isActive: false }
	});

	revalidatePath(pathName);
}

export async function userSetHomeActive(formData: FormData) {
	const homeId = formData.get("homeId") as string;
	const userId = formData.get("userId") as string;
	const pathName = formData.get("pathname") as string;

	await prisma.home.update({
		where: { id: homeId, userId: userId },
		data: { isActive: true }
	});

	revalidatePath(pathName);
}

export async function getActiveHomeData(userId: string) {
	const data = await prisma.home.findMany({
		where: {
			userId: userId,
			addedCategory: true,
			addedDescription: true,
			addedLocation: true,
			isActive: true,
		},
		select: {
			id: true,
			country: true,
			photo: true,
			description: true,
			price: true,
			Favourite: {
				where: {
					userId: userId
				}
			},
			
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const today = new Date();

	// Check for future reservations for each home
	const homesWithReservations = await Promise.all(data.map(async (home: HomeType) => {
		const hasFutureReservations = await prisma.reservation.findFirst({
				where: {
					homeId: home.id,
					startDate: { gt: today }, // Future reservations only
				},
		});

		return {
			...home,
			hasFutureReservations: !!hasFutureReservations, // Convert to boolean
		};
	}));

	return homesWithReservations;
}

export async function getInactiveHomeData(userId: string) {
	const data = await prisma.home.findMany({
		where: {
			userId: userId,
			addedCategory: true,
			addedDescription: true,
			addedLocation: true,
			isActive: false,
		},
		select: {
			id: true,
			country: true,
			photo: true,
			description: true,
			price: true,
			Favourite: {
				where: {
					userId: userId
				}
			}
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const today = new Date();

	// Check for future reservations for each home
	const homesWithReservations = await Promise.all(data.map(async (home: HomeType) => {
		const hasFutureReservations = await prisma.reservation.findFirst({
				where: {
					homeId: home.id,
					startDate: { gt: today }, // Future reservations only
				},
		});

		return {
			...home,
			hasFutureReservations: !!hasFutureReservations, // Convert to boolean
		};
	}));

	return homesWithReservations;
}

export async function getReservationsData(userId: string, statusType: string) {
	const data = await prisma.reservation.findMany({
		where: {
			userId: userId,
			status: statusType as ReservationStatus
		},
		distinct: ['homeId'],
		select: {
			id: true,
			Home: {
				select: {
					photo: true,
					id: true,
					price: true,
					country: true,
					description: true,
					Favourite: {
						where: {
							userId: userId
						}
					}
				}
			}
		}
	});

	return data;
}

export async function getReservationHomeData(userId: string, homeId: string) {
	const data = await prisma.home.findUnique({
		where: {
			id: homeId
		},
		select: {
			photo: true,
			guests: true,
			bathrooms: true,
			bedrooms: true,
			title: true,
			description: true,
			categoryName: true,
			price: true,
			country: true,
			createdAt: true,
			isActive: true,
			reservation: {
				where: {
					homeId: homeId,
					userId: userId
				},
			},
			User: {
				select: {
					firstName: true,
					profileImage: true,
				}
			}
		}
	});

	return data
}

export async function cancelReservation(formData: FormData) {
	const reservationId = formData.get("reservationId") as string;
	const pathName = formData.get("pathname") as string;

	await prisma.reservation.update({
		where: {id: reservationId},
		data: {status: "canceled" as ReservationStatus}
	})

	revalidatePath(pathName);
}

export async function getMyHomeData(homeId: string) {
	const data = await prisma.home.findUnique({
			where: {
				id: homeId
			},
			select: {
				photo: true,
				guests: true,
				bathrooms: true,
				bedrooms: true,
				title: true,
				description: true,
				categoryName: true,
				price: true,
				country: true,
				createdAt: true,
				isActive: true,
				reservation: {
					where: {
						homeId: homeId
					},
					select: {
						startDate: true,
						endDate: true,
						status: true,
						createdAt: true,
						id: true,
						User: true,
					}
				},
				User: {
					select: {
						firstName: true,
						profileImage: true,
					}
				}
			}
		});
	
		return data
}