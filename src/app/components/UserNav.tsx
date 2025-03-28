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
				<div className="rounded-full border p-2 lg:ps-3 lg:pe-2 lg:py-2 flex items-center gap-x-2">
					<MenuIcon className="w-5 h-5 lg:w-5 lg:h-5" />

					<img 
						src={
							user?.picture ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"
						}
						alt="User Image" 
						className="rounded-full h-6 w-6 hidden lg:block"
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
						<DropdownMenuItem className="cursor-pointer">
							<Link href="/my-homes" className="w-full">My Listings</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<Link href="/favourites" className="w-full">My Favourites</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<Link href="/reservations" className="w-full">My Reservations</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer">
							<LogoutLink className="w-full">Logout</LogoutLink>
						</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuItem className="cursor-pointer">
							<RegisterLink className="w-full">Register</RegisterLink>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<LoginLink className="w-full">Login</LoginLink>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}