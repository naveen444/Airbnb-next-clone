import Image from "next/image";
import Link from "next/link";
import desktopLogo from "../../../public/airbnb-desktop.png";
import mobileLogo from "../../../public/airbnb-mobile.webp";
import { UserNav } from "./UserNav";
import { SearchComponent } from "./SearchComponent";

export function Navbar() {
	return (
		<nav className="w-full border-b">
			<div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-3">
				
				<Link href="/">
					<Image src={desktopLogo} alt="Desktop Logo" className="w-20 hidden lg:block" />
					<Image src={mobileLogo} alt="Mobile Logo" className="w-8 block lg:hidden" />
				</Link>

				<SearchComponent />

				<UserNav />
			</div>
		</nav>
	)
}