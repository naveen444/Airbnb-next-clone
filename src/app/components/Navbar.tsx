import Image from "next/image";
import Link from "next/link";
import desktopLogo from "../../../public/airbnb-desktop.png";
import mobileLogo from "../../../public/airbnb-mobile.webp";
import { UserNav } from "./UserNav";
import { SearchComponent } from "./SearchComponent";
import ModeToggler from "./ModeToggler";

export function Navbar() {
	

	return (
		<nav className="w-full border-b">
			<div className="flex items-center justify-between container mx-auto py-3">
				
				<Link href="/">
					<Image src={desktopLogo} alt="Desktop Logo" className="w-20 hidden lg:block" />
					<Image src={mobileLogo} alt="Mobile Logo" className="w-8 block lg:hidden" />
				</Link>

				<SearchComponent />

				<div className="rounded-full border py-1 px-1.5 sm:p-2 lg:ps-3 lg:pe-2 lg:py-2 flex items-center gap-x-2">
					<ModeToggler />
					<UserNav />
				</div>
			</div>
		</nav>
	)
}