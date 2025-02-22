'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head'; // Head 추가

interface FormData {
    query: string;
}

export default function Home() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async (data: any) => {
        setLoading(true);
        setResults([]);
        setHasSearched(true);
        try {
            const query = data.query.trim();
            if (!query) return;

            const response = await fetch(`/api/notion?query=${query}`);
            const result = await response.json();

            const mainPriorityResults = result.filter((item: any) =>
                item.properties?.Status?.status?.name === 'Ховдод ирсэн'
            );
            const otherResults = result.filter((item: any) =>
                !['Ховдод ирсэн', 'Эрээн-> Улаанбаатар', 'Эрээнд ирсэн'].includes(item.properties?.Status?.status?.name)
            );

            setResults([...mainPriorityResults, ...otherResults]);
        } catch (error) {
            console.error('Error searching Notion:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* SEO 정보 추가 */}
            <Head>
                <meta charSet="UTF-8" />
                <title>Ховд Экспресс карго</title>
                <meta name="description" content="Ховд Экспресс карго нь Бүгд Найрамдах Хятад Ард Улсын бүх хотуудаас бүх төрлийн барааг Ховд аймаг руу маш хурдан шуурхай, аюулгүй тээвэрлэх үйлчилгээ үзүүлдэг Карго юм." />
                <meta name="keywords" content="Ховд Экспресс карго" />
                <meta name="author" content="Ховд Экспресс карго" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Ховд Экспресс карго" />
                <meta property="og:description" content="Ховд Экспресс карго нь Бүгд Найрамдах Хятад Ард Улсын бүх хотуудаас бүх төрлийн барааг Ховд аймаг руу маш хурдан шуурхай, аюулгүй тээвэрлэх үйлчилгээ үзүүлдэг Карго юм." />
                <meta property="og:image" content="/logo1.png" />
                <meta property="og:url" content="https://khovd.vercel.app/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Ховд Экспресс карго" />
                <meta name="twitter:description" content="Ховд Экспресс карго нь Бүгд Найрамдах Хятад Ард Улсын бүх хотуудаас бүх төрлийн барааг Ховд аймаг руу маш хурдан шуурхай, аюулгүй тээвэрлэх үйлчилгээ үзүүлдэг Карго юм." />
                <meta name="twitter:image" content="/logo1.png" />
            </Head>

            <div className="min-h-screen flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: 'url("https://cdn.caliverse.io/images/bg_mint.jpeg")', backgroundSize: 'cover' }}>
                <div className="w-full mx-auto items-center">
                    {/* Header Section */}
                    <div className="w-full px-10 h-[100px] bg-[#000000] flex items-center justify-center text-white font-bold text-[20px]">
                        <Image
                            src="/logo1.png"
                            alt="Uni Cargo Logo"
                            width={100}
                            height={100}
                            priority
                            fetchPriority="high"
                        />

                        <p className="ml-6"> Ачаа шалгах</p>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <div className="flex justify-center mb-10 h-[40px] md:h-auto">
                            <div className="relative flex w-full max-w-[756px]">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`!absolute right-0 top-0 h-full select-none rounded-[100px] py-1 px-6 text-center align-middle text-md text-white transition-all focus:opacity-[0.85] outline-none border-0 
                                    ${loading ? 'bg-[#3B82F6]' : 'bg-[#3B82F6] hover:bg-[#3B82F699]'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    {loading ? 'Хайж байна...' : 'Хайх'}
                                </button>
                                <input
                                    id="query"
                                    autoComplete="off"
                                    type="text"
                                    {...register('query', { required: '*Заавал утга оруулна уу.' })}
                                    className="text-[#ffffff] text-md py-3 px-4 w-full rounded-[100px] bg-black pr-12 font-normal border border-[#3B82F6] border-solid focus:outline-none"
                                    placeholder="Track код оруулна уу."
                                />
                            </div>
                        </div>
                    </form>
                    {!hasSearched && (
                        <div className="bg-[#000000] text-[#ffffff] p-6 rounded-md shadow-md max-w-[756px] mx-auto">
                            <h2 className=" flex items-center justify-center text-xl font-bold mb-4">Ховд Экспресс карго</h2>

                            <p className="mb-2">
                            Ховд Экспресс карго нь Бүгд Найрамдах Хятад Ард Улсын бүх хотуудаас бүх төрлийн барааг Ховд аймаг руу маш хурдан шуурхай, аюулгүй тээвэрлэх үйлчилгээ үзүүлдэг Карго юм.
                            </p>
                            <ul className="list-disc list-inside">
                                <li className='font-bold'>Каргоны үнийн мэдээлэл</li>
                                <p className="mb-4">
                                * 0-с 100гр 1500~2000₮<br />
                                * Кг- 2500₮<br />
                                * М3- 400₮ <br />
                                * Овортой барааг овроор бодно.
                                </p>
                                <li className='font-bold'>Карго холбох заавар: </li>
                                <p className="mb-4">
                                1-р мөр Ховд экспресс <br />
                                2-р мөр 18747467880<br />
                                3-р мөр 内蒙古自治区锡林郭勒盟二连浩特市 <br />
                                4-р мөр 义乌南门兔喜快递超市1号 ( нэр дугаар TA )<br />
                                </p>
                            </ul>
                        </div>
                    )}

                    {/* Search Results */}
                    <div className="w-full max-w-[1200px] mx-auto text-[16px] mb-10">
                        {hasSearched && (
                            <div className="flex justify-between mb-3">
                                <div className="font-extrabold md:text-lg">Нийт {results.length} ачаа</div>
                                <div className="md:text-lg">
                                    <span className="font-extrabold text-primary">
                                            {results.reduce((sum, result) => {
                                            // "Хүлээн авсан" 상태를 제외하고 합계 계산
                                            if (result.properties?.Status?.status?.name !== "Хүлээн авсан") {
                                                return sum + Number(result.properties?.Price?.number ?? 0);
                                            }
                                            return sum;
                                        }, 0).toLocaleString()} ₮
                                    </span>
                                </div>
                            </div>
                        )}

                        {results.length > 0 && (
                            <div className="block md:flex flex-col w-full gap-[2px] text-[14px]">
                                {results.map((result, index) => {
                                    const iActive = result?.properties?.Status?.status?.name === "Хүлээн авсан";
                                    return (
                                        <div
                                            key={index}
                                            className={`w-full flex items-center justify-between p-4 border border-[#3B82F6] border-solid rounded-md md:h-[64px] ${result?.properties?.Status?.status?.name === "Хүлээн авсан" ? ' bg-[#333D47]' : 'bg-[#000000]'} my-1`}
                                        >
                                            <div className="flex md:flex-row flex-col gap-1 md:gap-[100px]">
                                                <div className="text-[#FFFFFF] flex items-center gap-2">
                                                    <div>Утасны дугаар:</div>
                                                    <div className="text-[#8C9DAF]">{result.properties?.Phone?.phone_number || '정보 없음'}</div>
                                                </div>
                                                <div className="text-[#FFFFFF] flex items-center gap-2">
                                                    <div>Захиалгын дугаар:</div>
                                                    <div className="text-[#8C9DAF]">{result.properties?.Order?.rich_text[0]?.text?.content || '정보 없음'}</div>
                                                </div>
                                                <div className="text-[#FFFFFF] flex items-center gap-2">
                                                    <div>Төлөв:</div>
                                                    <div className="text-[#8C9DAF]">{result.properties?.Status?.status?.name || '정보 없음'}</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className={`col-span-1 flex items-center gap-1 ${iActive ? "bg-[transparent]" : "bg-[#3B82F6]"} rounded p-2 px-5`}>
                                                    <div className="text-[#ffffff] font-medium text-l">
                                                        {!iActive
                                                            ? Number(result.properties?.Price?.number ?? "0").toLocaleString() + ' ₮' || '정보 없음'
                                                            : <span className="font-bold"> Олгогдсон </span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {!loading && hasSearched && results.length === 0 && (
                                    <div className="mt-8 text-center text-[#ffffff]">
                                        Илэрц олдсонгүй.
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>

                {/* Footer */}
                <footer className="w-full flex text-white py-5 items-center justify-center">
                    <div className="flex items-center mx-auto gap-4">
                        <a
                            href="https://www.facebook.com/groups/569847415823661/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-11 h-11"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.463.099 2.796.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.593 1.325-1.326V1.326C24 .593 23.407 0 22.675 0z"
                                />
                            </svg>
                        </a>

                        <div className="flex flex-col items-start gap-2">
                            <p className="text-sm font-bold">Холбоо барих</p>
                            <p className="text-sm font-bold">Утасны дугаар: 95641302, 95533501</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
