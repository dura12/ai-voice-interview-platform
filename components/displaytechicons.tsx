"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn, getTechLogos } from "@/lib/utils";

interface TechIconProps {
  techStack: string[];
}

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  const [techIcons, setTechIcons] = useState<{ tech: string; url: string }[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      const icons = await getTechLogos(techStack);
      setTechIcons(icons);
    };
    fetchIcons();
  }, [techStack]);

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1">
            {tech}
          </span>

          <Image
            src={url}
            alt={tech}
            title={tech}
            width={100}
            height={100}
            className="w-5 h-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
