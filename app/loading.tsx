// app/loading.tsx (versão simplificada)
export default function Loading() {
    return (
        <div className="space-y-6 p-5">
            {/* Header */}
            <div className="space-y-2">
                <div className="h-8 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>

            {/* Search */}
            <div className="h-12 bg-gray-600 rounded animate-pulse"></div>

            {/* Sections */}
            {[1, 2, 3].map((section) => (
                <div key={section} className="space-y-3">
                    <div className="h-4 bg-gray-600 rounded w-1/4 animate-pulse"></div>
                    <div className="flex gap-4 overflow-x-auto">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="min-w-[167px] h-40 bg-gray-700 rounded animate-pulse"></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
