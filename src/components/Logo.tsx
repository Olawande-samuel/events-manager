import Image from "next/image";

const Logo = ({ src }: { src?: string }) => {
	return (
		<Image src={src ?? "/images/logo.svg"} width={180} height={70} alt="logo" className="object-contain" />
	);
};
export default Logo;
