import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

const Rate = () => {
  const maxStars = 5;
  const [tempStar, setTempStar] = useState(0);
  const [star, setStar] = useState(0);

  const onHover = (value) => {
    setTempStar(value);
  };
  const onClick = (value) => {
    setStar(value);
  };
  return (
    <div className="mt-6">
      <p className="justify-center">How was the service?</p>
      <div className="flex justify-center">
        {[...Array(maxStars)].map((_, index) => (
          <Star
            key={index}
            strokeWidth={1}
            size={24}
            className={cn(
              "fill-slate-300  text-transparent cursor-pointer",
              tempStar > index && "fill-yellow-500",
              star > index && "fill-yellow-500"
            )}
            onMouseEnter={() => onHover(index + 1)}
            onMouseLeave={() => onHover(0)}
            onClick={() => onClick(index + 1)}
          />
        ))}
      </div>
      <Button
        className="bg-emerald-500 hover:bg-emerald-600 w-full mt-4"
        type="button"
        onClick={() => {}}
      >
        Submit
      </Button>
    </div>
  );
};

export default Rate;
