import React from "react";
import Link from "next/link";

type Props = {};

function NotFound({}: Props) {
  return (
    <div>
      <div className="text-center p-8">
        <h2 className="text-3xl mb-4"> Sorry Page Not Found 😧</h2>
        <Link href="/">
          <button className="p-1 rounded-lg bg-white text-brand-blue border border-brand-blue border-2 hover:bg-brand-blue hover:text-white">
            Go back to the Home Page
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
