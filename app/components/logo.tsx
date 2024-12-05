import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        src="/logo.svg"
        height={90}
        width={90}
        alt="logo"
        loading="eager"
      />
    </div>
  );
};

export default Logo;
