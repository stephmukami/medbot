import React from 'react'

type Props = {}

function Footer({}: Props) {
    const currentYear = new Date().getFullYear();

  return (
    <div>
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>&copy; {currentYear} MedBot 🥼 All rights reserved.</p>
    </footer>
    </div>
  )
}

export default Footer