import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b">
            <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between">
                <h1>Himanshu Jha</h1>

                <div className="flex gap-6">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            </div>
        </nav>
    );
}

// export default function Navbar() {
//     return (
//         <nav className="border-b">
//             <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between">
//                 <h1>Himanshu Jha</h1>

//                 <div className="flex gap-6">
//                     <a href="/">Home</a>
//                     <a href="/about">About</a>
//                     <a href="/projects">Projects</a>
//                     <a href="/contact">Contact</a>
//                 </div>
//             </div>
//         </nav>
//     );
// }