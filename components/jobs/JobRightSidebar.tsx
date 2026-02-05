"use client";

export default function JobRightSidebar() {
    return (
        <div className="space-y-8">
            {/* Google Advertisement Section 1 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden relative group">
                <div className="absolute top-2 right-2 bg-gray-100 text-[10px] text-gray-500 px-1.5 rounded">Ad</div>

                <div className="flex flex-col items-center text-center mt-4">
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4 text-gray-400">
                        <span className="text-xs font-medium">Google Ad (300x250)</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Premium Career Service</h3>
                    <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                        Get your resume reviewed by experts and land your dream job faster.
                    </p>
                    <button className="w-full bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-bold py-2.5 rounded-xl transition-colors">
                        Open
                    </button>

                    {/* Placeholder for actual Ad Script */}
                    <div className="hidden">
                        {/* <ins className="adsbygoogle" ... ></ins> */}
                    </div>
                </div>
            </div>

            {/* Google Advertisement Section 2 (Tall) */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden relative group">
                <div className="absolute top-2 right-2 bg-gray-100 text-[10px] text-gray-500 px-1.5 rounded">Ad</div>

                <div className="flex flex-col items-center text-center mt-4">
                    <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center mb-4 text-gray-400">
                        <span className="text-xs font-medium">Google Ad (160x600)</span>
                    </div>
                    <p className="text-xs text-gray-400">Advertisement</p>
                </div>
            </div>
        </div>
    );
}
