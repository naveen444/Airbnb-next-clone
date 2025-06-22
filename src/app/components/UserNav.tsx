import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createAirbnbHome } from "../actions";

export async function UserNav() {
	const {getUser} = getKindeServerSession();
	const user = await getUser();

	const createHomeWithId = createAirbnbHome.bind(null, {userId: user?.id as string});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="cursor-pointer">
				<div className="flex items-center gap-x-1.5">
					<MenuIcon className="w-5 h-5 lg:w-5 lg:h-5" />

					<img 
						src={
							user?.picture ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"
						}
						alt="User Image" 
						className="rounded-full h-6 w-6"
					/>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-[200px]">
				{ user ? (
					<>
						<DropdownMenuItem className="cursor-pointer">
							<form action={createHomeWithId} className="w-full">
								<button className="w-full text-start cursor-pointer" type="submit">
									Airbnb your Home
								</button>
							</form>
						</DropdownMenuItem>
						<Link href="/my-homes" className="w-full">
							<DropdownMenuItem className="cursor-pointer">
								My Listings
							</DropdownMenuItem>
						</Link>
						<Link href="/favourites" className="w-full">
							<DropdownMenuItem className="cursor-pointer">
								My Favourites
							</DropdownMenuItem>
						</Link>
						<Link href="/reservations" className="w-full">
							<DropdownMenuItem className="cursor-pointer">
								My Reservations
							</DropdownMenuItem>
						</Link>
						<DropdownMenuSeparator />
						<LogoutLink className="w-full">
							<DropdownMenuItem className="cursor-pointer">
								Logout
							</DropdownMenuItem>
						</LogoutLink>
					</>
				) : (
					<>
						<RegisterLink className="w-full">
							<DropdownMenuItem className="cursor-pointer">
								Register
							</DropdownMenuItem>
						</RegisterLink>
						<LoginLink className="w-full">
							<DropdownMenuItem className="cursor-pointer">
								Login
							</DropdownMenuItem>
						</LoginLink>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}