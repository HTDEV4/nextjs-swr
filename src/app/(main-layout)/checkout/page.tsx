

export default function CheckoutPage() {
    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Checkout</h1>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Tỉnh / Thành phố</label>
                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="0">Chọn Tỉnh/Thành phố</option>
                    {/* Options... */}
                </select>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Quận / Huyện</label>
                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="0">Chọn Quận/Huyện</option>
                    {/* Options... */}
                </select>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Xã / Phường</label>
                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="0">Chọn Xã/Phường</option>
                    {/* Options... */}
                </select>
            </div>
        </div>

    );
}
