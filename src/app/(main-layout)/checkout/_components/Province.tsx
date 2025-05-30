"use client"

import { useState } from "react";
import useSWR from "swr";

interface IProvince {
    province_id: string;
    province_name: string;
}

interface IDistrict {
    district_id: string;
    district_name: string;
}

interface IWard {
    ward_id: string;
    ward_name: string;
}


const fallbackDataDefault = {
    results: [], // Mặc định nó là array để khi map nó kh bị lỗi 
};

const getProvince = async () => {
    const response = await fetch(`https://api.vnappmob.com/api/v2/province/`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

const getDistrict = async (provinceId: string) => {
    const response = await fetch(`https://api.vnappmob.com/api/v2/province/district/${provinceId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

const getWard = async (districtId: string) => {
    const response = await fetch(`https://api.vnappmob.com/api/v2/province/ward/${districtId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

export default function Province() {
    const [provinceId, setProvinceId] = useState<string>("");
    const [districtId, setDistrictId] = useState<string>("");

    const {
        data: { results: province }
    } = useSWR("/province", getProvince, {
        fallbackData: fallbackDataDefault
    });

    const {
        data: { results: district }
    } = useSWR(provinceId ? `/district/${provinceId}` : null, () => getDistrict(provinceId), {  // vì () => getDistrict(provinceId) nó tự pass params từ key sang
        fallbackData: fallbackDataDefault
    });

    const {
        data: { results: ward }
    } = useSWR(districtId ? `/ward/${districtId}` : null, () => getWard(districtId), {  // vì () => getDistrict(provinceId) nó tự pass params từ key sang
        fallbackData: fallbackDataDefault
    });

    return (
        <div >
            <div>
                <label className="block text-gray-700 font-medium mb-1">Tỉnh / Thành phố</label>
                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setProvinceId(e.target.value)}
                >
                    <option value="0">Chọn Tỉnh/Thành phố</option>
                    {
                        province.map((item: IProvince) => (
                            <option key={item.province_id} value={item.province_id}>{item.province_name}</option>
                        ))
                    }
                </select>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Quận / Huyện</label>
                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setDistrictId(e.target.value)}
                >
                    <option value="0">Chọn Quận/Huyện</option>
                    {
                        district.map((item: IDistrict) => (
                            <option key={item.district_id} value={item.district_id}>{item.district_name}</option>
                        ))
                    }
                </select>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Xã / Phường</label>
                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="0">Chọn Xã/Phường</option>
                    {
                        ward.map((item: IWard) => (
                            <option key={item.ward_id} value={item.ward_id}>{item.ward_name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}
