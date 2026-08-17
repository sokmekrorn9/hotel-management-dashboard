import "react";

export function PromotionsView({ guests }) {
  const targeted = guests
    .filter((g) => g.segment === "VIP" || g.segment === "Returning")
    .slice(0, 4);
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Promotions &amp; Personalized Offers
        </h2>
        <p className="text-sm text-gray-500">
          Targeted promotions based on guest segmentation
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {targeted.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={`https://i.pravatar.cc/64?img=${g.id + 20}`}
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <div>
                <p className="font-medium text-gray-900 text-sm">{g.name}</p>
                <p className="text-xs text-gray-400">
                  {g.totalStays} previous stays · {g.loyaltyTier}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-1">
              Preference: {g.preferences[0]}
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2 mt-2">
              <p className="text-xs font-semibold text-indigo-700">
                Suggested Promotion
              </p>
              <p className="text-sm text-indigo-900">
                20% Executive Suite Upgrade
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
