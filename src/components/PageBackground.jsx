// Flowing purple-to-white wave ribbons on a near-black canvas.
//
// The layer is `fixed`, so it only has to cover the screen (not the whole
// scrolling page). That keeps scrolling smooth, especially on phones.

// Blur filters need a big drawing area, otherwise the soft edges get clipped.
const blurArea = {
    filterUnits: "userSpaceOnUse",
    x: -400,
    y: -400,
    width: 2240,
    height: 1700,
};

export default function PageBackground() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
        >
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Gradients */}
                    <linearGradient id="gA" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#6128c2" stopOpacity="0" />
                        <stop offset="12%" stopColor="#7a3fe0" stopOpacity="0.8" />
                        <stop offset="45%" stopColor="#9566f5" stopOpacity="1" />
                        <stop offset="78%" stopColor="#b497ff" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#d4c1ff" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="gB" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="15%" stopColor="#c4b5fd" stopOpacity="0.5" />
                        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="65%" stopColor="#e0e7ff" stopOpacity="0.8" />
                        <stop offset="85%" stopColor="#c4b5fd" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="gC" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#4b1c9a" stopOpacity="0" />
                        <stop offset="15%" stopColor="#4b1c9a" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#6128c2" stopOpacity="0.9" />
                        <stop offset="85%" stopColor="#7a3fe0" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#9566f5" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="gD" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffc83d" stopOpacity="0" />
                        <stop offset="20%" stopColor="#ffc83d" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#ffe08a" stopOpacity="0.3" />
                        <stop offset="80%" stopColor="#ffc83d" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#ffc83d" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="gEdge" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="18%" stopColor="#d4c1ff" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="82%" stopColor="#c4b5fd" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>

                    {/* Blur filters (from very soft to crisp) */}
                    <filter id="f50" {...blurArea}><feGaussianBlur stdDeviation="50" /></filter>
                    <filter id="f25" {...blurArea}><feGaussianBlur stdDeviation="25" /></filter>
                    <filter id="f12" {...blurArea}><feGaussianBlur stdDeviation="12" /></filter>
                    <filter id="f5" {...blurArea}><feGaussianBlur stdDeviation="5" /></filter>
                    <filter id="f2" {...blurArea}><feGaussianBlur stdDeviation="2" /></filter>
                </defs>

                {/* Wave A: main sweep, bottom-left to top-right */}
                <path d="M-100,820 C200,620 450,780 750,500 C1050,220 1250,420 1550,200" stroke="url(#gC)" strokeWidth="300" filter="url(#f50)" strokeLinecap="round" />
                <path d="M-80,800 C210,600 460,760 755,480 C1050,200 1260,400 1550,190" stroke="url(#gA)" strokeWidth="100" filter="url(#f25)" strokeLinecap="round" />
                <path d="M-60,785 C220,590 470,748 760,470 C1050,192 1265,390 1550,182" stroke="url(#gB)" strokeWidth="40" filter="url(#f12)" strokeLinecap="round" />
                <path d="M-70,810 C215,605 465,770 758,490 C1050,210 1262,405 1550,195" stroke="url(#gD)" strokeWidth="70" filter="url(#f25)" strokeLinecap="round" />
                <path d="M-50,782 C225,588 475,745 762,467 C1050,189 1268,387 1550,180" stroke="url(#gEdge)" strokeWidth="2" filter="url(#f2)" strokeLinecap="round" />
                <path d="M-50,782 C225,588 475,745 762,467 C1050,189 1268,387 1550,180" stroke="url(#gEdge)" strokeWidth="6" filter="url(#f5)" strokeLinecap="round" opacity="0.5" />

                {/* Wave B: upper sweep */}
                <path d="M-200,400 C100,220 350,380 680,180 C1010,-20 1250,200 1650,50" stroke="url(#gC)" strokeWidth="200" filter="url(#f50)" strokeLinecap="round" opacity="0.6" />
                <path d="M-180,385 C110,210 360,365 685,170 C1010,-25 1260,190 1650,42" stroke="url(#gA)" strokeWidth="55" filter="url(#f25)" strokeLinecap="round" opacity="0.5" />
                <path d="M-160,378 C120,205 370,358 688,165 C1010,-28 1265,185 1650,38" stroke="url(#gB)" strokeWidth="18" filter="url(#f5)" strokeLinecap="round" opacity="0.55" />
                <path d="M-155,375 C125,203 375,355 690,163 C1010,-30 1267,183 1650,36" stroke="url(#gEdge)" strokeWidth="1.5" filter="url(#f2)" strokeLinecap="round" opacity="0.4" />

                {/* Wave C: lower-right accent */}
                <path d="M300,900 C500,780 720,860 1000,700 C1280,540 1380,660 1550,600" stroke="url(#gA)" strokeWidth="140" filter="url(#f50)" strokeLinecap="round" opacity="0.5" />
                <path d="M320,890 C510,772 730,850 1005,692 C1280,534 1385,655 1550,595" stroke="url(#gB)" strokeWidth="20" filter="url(#f12)" strokeLinecap="round" opacity="0.35" />
                <path d="M330,887 C515,770 735,847 1008,690 C1280,532 1388,653 1550,593" stroke="url(#gEdge)" strokeWidth="1.5" filter="url(#f2)" strokeLinecap="round" opacity="0.3" />
            </svg>

            {/* Soft glow spots */}
            <div className="absolute left-[30%] top-[35%] h-[300px] w-[300px] rounded-full bg-brand-500/15 blur-[100px]" />
            <div className="absolute right-[15%] top-[15%] h-[250px] w-[250px] rounded-full bg-brand-400/10 blur-[80px]" />

            {/* A light dark veil keeps the text on top easy to read */}
            <div className="absolute inset-0 bg-[#060314]/30" />

            {/* Fade the top and bottom edges into the page colour */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040210] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#060314]/60 to-transparent" />
        </div>
    );
}