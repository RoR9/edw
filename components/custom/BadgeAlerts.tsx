"use client";
import React from "react";
import { BadgeAlert, BadgeCheck, BadgeX } from "lucide-react";
import { BADGE_RANGE } from "@/lib/constants";

type Props = {
  daysToExpire: number | null;
};

const BadgeAlerts: React.FC<Props> = ({ daysToExpire }) => {
  if (Number.isNaN(daysToExpire) || daysToExpire === null) {
    return null;
  }

  if (daysToExpire < BADGE_RANGE.red) {
    return <BadgeX color="red" className="h-5 w-5" />;
  } else if (daysToExpire < BADGE_RANGE.yellow) {
    return <BadgeAlert color="yellow" className="h-5 w-5" />;
  } else if (daysToExpire >= BADGE_RANGE.yellow) {
    return <BadgeCheck color="green" className="h-5 w-5 " />;
  }
  return null;
};

export default BadgeAlerts;
