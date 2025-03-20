import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  { text: "add quiz", path: ".", icon: <FaWpforms /> },
  { text: "all quizzes", path: "all-quizzes", icon: <MdQueryStats /> },
  { text: "profile", path: "profile", icon: <ImProfile /> },
];

export default links;
