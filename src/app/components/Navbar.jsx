"use client"
import Link from "next/link"
function Navbar() {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">

                <h1 className="text-white text-2xl font-bold">Income-Expense Tracker</h1>

                <div>

                    <Link href="/" className="text-white mx-2">

                        Home
                    </Link>

                    <Link href="/create" className="text-white mx-2">

                        Create Record

                    </Link>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;
