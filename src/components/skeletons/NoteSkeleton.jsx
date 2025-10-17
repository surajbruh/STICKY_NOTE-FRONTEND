const NoteSkeleton = () => {
    return (
        <section className="animate-pulse space-y-2 w-full max-w-md mx-auto">
            {/* Header line */}
            <div className="bg-gray-600 w-full h-[2px] rounded" />

            {/* Body skeleton */}
            <div className="bg-gray-700 w-full h-[200px] p-4 rounded-md space-y-3">
                {/* Top bar placeholder */}
                <div className="flex justify-end">
                    <div className="bg-gray-500 h-4 w-8 rounded" />
                </div>

                {/* Content placeholder */}
                <div className="space-y-2">
                    <div className="bg-gray-500 h-4 w-full rounded" />
                    <div className="bg-gray-500 h-4 w-5/6 rounded" />
                    <div className="bg-gray-500 h-4 w-3/4 rounded" />
                    <div className="bg-gray-500 h-4 w-2/3 rounded" />
                    <div className="bg-gray-500 h-4 w-1/2 rounded" />
                </div>
            </div>
        </section>
    );
};

export default NoteSkeleton;
