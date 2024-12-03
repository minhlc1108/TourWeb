import { Calendar, Rate } from "antd";
import { ArrowLeft, ArrowRight, ChevronRight, CircleCheck, CircleX, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTourDetail } from "~/apis";
import dayjs from 'dayjs';

export default function TourDetail() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [active, setActive] = useState(0)
    const [showDetailTour, setShowDetailTour] = useState(false)
    const navigate = useNavigate()
    const calendarRef = useRef(null);
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const getTour = () => {
        getTourDetail(id).then((data) => {
            setData(data)
        })
    }
    const scrollToCalendar = () => {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (id) getTour();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    const [moneyByDay, setMoneyByDay] = useState({});

    useEffect(() => {
        if (data?.departure && data?.schedules[0]?.priceAdult) {
            const formattedDate = dayjs(data?.departure).format('YYYY-MM-DD');
            setMoneyByDay(prevState => ({
                ...prevState,
                [formattedDate]: data?.schedules[0]?.priceAdult
            }));
        }
    }, [data]);

    const dateCellRender = (value) => {
        const dateStr = value.format('YYYY-MM-DD');
        const money = moneyByDay[dateStr];

        return (
            <div className="absolute top-0 right-0 left-0 bottom-0" onClick={() => money && setShowDetailTour(true)}>
                {money && <span className="absolute top-1/3 right-0 left-1/4 bottom-0 mx-auto text-red-600 font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)}</span>}
            </div>
        );
    };


    return (
        <div className="py-8">
            <div className="max-w-[1600px] mx-auto gap-8 grid grid-cols-7">
                <div className="col-span-5">
                    <div className="w-full h-[500px]">
                        <img
                            className="w-full h-full"
                            src={'https://caodangbachkhoa.edu.vn/wp-content/uploads/2019/08/xu-huong-phat-trien-du-lich-viet-nam.jpg'} alt="" />
                    </div>
                    <div className="py-[30px] border-b">
                        <h3 className="font-bold text-3xl">{data?.name}</h3>
                    </div>
                    <div>
                        <h3 className="py-[20px] font-bold text-2xl">Overview</h3>
                        <div className="w-full">
                            <p className="text-base font-semibold text-gray-700 text-wrap text-justify">
                                {data?.detail}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="py-[20px] font-bold text-2xl">Included / Exclude</h3>
                        <div className="grid grid-cols-2 gap-3 max-w-[800px] py-1">
                            <div className="flex items-center gap-3 *:text-base">
                                <CircleCheck className="text-red-400" />
                                <span>
                                    Pick and Drop Services
                                </span>
                            </div>
                            <div className="flex items-center gap-3 *:text-base">
                                <CircleX className="text-red-400" />
                                <span>
                                    Additional Services
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 max-w-[800px] py-1">
                            <div className="flex items-center gap-3 *:text-base">
                                <CircleCheck className="text-red-400" />
                                <span>
                                    1 Meal Per Day

                                </span>
                            </div>
                            <div className="flex items-center gap-3 *:text-base">
                                <CircleX className="text-red-400" />
                                <span>
                                    Insurance
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 max-w-[800px] py-1">
                            <div className="flex items-center gap-3 *:text-base">
                                <CircleCheck className="text-red-400" />
                                <span>
                                    Cruise Dinner & Music Event
                                </span>
                            </div>
                            <div className="flex items-center gap-3 *:text-base">
                                <CircleX className="text-red-400" />
                                <span>
                                    Food & Drinks
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 max-w-[800px] py-1">
                            <div className="flex items-center gap-3 *:text-base">
                                <CircleCheck className="text-red-400" />
                                <span>
                                    Visit 7 Best Places in the City With Group
                                </span>
                            </div>
                            <div className="flex items-center gap-3 *:text-base">
                                <CircleX className="text-red-400" />
                                <span>
                                    Tickets
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="py-[20px] font-bold text-2xl">Tour Plan</h3>
                        <div className="w-full flex flex-col gap-6 duration-300">
                            {
                                Array.from({ length: 4 }, (_, i) => {
                                    const dayIndex = i + 1;
                                    return (
                                        <button
                                            key={dayIndex}
                                            onClick={() => setActive(active === dayIndex ? null : dayIndex)}
                                            className="w-full"
                                        >
                                            <div className="justify-between h-[40px] bg-gray-100 flex items-center px-4 text-base gap-3 shadow-md">
                                                <div>
                                                    <span className="text-red-400 font-bold">Day {dayIndex}:</span>
                                                    <span className="font-semibold"> Welcome to Hungary</span>
                                                </div>
                                                <div>
                                                    <ChevronRight
                                                        className={active === dayIndex ? "rotate-90" : "-rotate-90"}
                                                    />
                                                </div>
                                            </div>
                                            {active === dayIndex && (
                                                <div className="w-full transform transition-transform duration-300 shadow text-justify">
                                                    <p className="px-3 py-5 text-base">
                                                        There are many variations of passages available, but the majority have alteration in some by injecting humor or random words. Lorem ipsum dolor sit amet, error insolens reprimique no quo, ea pri verterem phaedr vel ea iisque aliquam.
                                                        <ul className="font-bold py-4">
                                                            <li>• Free Drinks</li>
                                                            <li>• Awesome Breakfast</li>
                                                            <li>• 5 Star Accommodation</li>
                                                        </ul>
                                                    </p>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h3 className="py-[20px] font-bold text-2xl">Calendar & Prices</h3>
                        <div ref={calendarRef}>
                            {
                                showDetailTour ?
                                    <div className="w-full shadow-lg h-[400px] rounded-lg bg-white">
                                        <div className="flex items-center justify-between pr-[30px]">
                                            <button className="py-[20px] px-[10px] flex items-center gap-2" onClick={() => setShowDetailTour(false)}>
                                                <ArrowLeft className="mx-auto" />
                                                <span className="font-bold text-base">Back</span>
                                            </button>
                                            <div>
                                                <h2 className="font-bold text-red-600 text-2xl">{dayjs(data?.departure).format('DD/MM/YYYY')}</h2>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <h3 className="text-center text-blue-800 text-xl font-semibold">Means of transport</h3>
                                            <div className="flex items-center w-full justify-center gap-[10px] py-[20px]">
                                                <div className="flex items-center">
                                                    <span className="font-bold text-base pr-2">Departure date</span> <span> - {dayjs(data?.departure).format('DD/MM/YYYY')}</span>
                                                </div>
                                                <div>
                                                    <span><ArrowRight className="w-[200px]" /></span>
                                                </div>
                                                <div>
                                                    <span className="font-bold text-base pr-2">Return date</span>
                                                    <span> - {dayjs(data?.departure).add(data?.duration, 'day').format('DD/MM/YYYY')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-center text-blue-800 text-xl font-semibold">Tour price</h3>
                                            <div className="flex items-center w-full justify-center gap-[10px] py-[20px] h-[100px]">
                                                <div className="flex items-center w-[300px] justify-between border-r-2 px-[30px] border-gray-400 h-full">
                                                    <span className="font-bold text-base pr-2">Adult:</span>
                                                    <span className="text-red-600 font-bold">
                                                        {data?.schedules[0]?.priceAdult && new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(data?.schedules[0]?.priceAdult)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center w-[300px] justify-between px-[30px] h-full">
                                                    <span className="font-bold text-base pr-2">Child:</span>
                                                    <span className="text-red-600 font-bold">
                                                        {data?.schedules[0]?.priceChild && new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(data?.schedules[0]?.priceChild)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <Calendar onPanelChange={onPanelChange} dateCellRender={dateCellRender} />
                            }
                        </div>
                    </div>
                    <div>
                        <h3 className="py-[20px] font-bold text-2xl">Map</h3>
                        <div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45627.29190436512!2d4.267139896886524!3d52.07126241388843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b7235573af11%3A0xb981504e502da55c!2sMauritshuis!5e0!3m2!1svi!2s!4v1732265514076!5m2!1svi!2s" width="100%" height="450" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div className="pt-[50px]">
                        <h3 className="py-[20px] font-bold text-2xl">Showing 1 review</h3>
                        <div className="border w-full px-6 py-4 flex items-start gap-4">
                            <div className="w-[60px] overflow-hidden rounded-full">
                                <img src={'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/anh-dai-dien-tet-18.jpg'} alt="" />
                            </div>
                            <div>
                                <span>March 20, 2022</span>
                                <h4 className="font-bold py-1">Sindy Simmons</h4>
                                <div className="flex items-center gap-4">
                                    <div className="py-1 bg-red-500 flex items-center *:text-white font-bold gap-2 px-2 w-[75px] rounded-lg">
                                        <Star />
                                        <span>4.8</span>
                                    </div>
                                    <div>
                                        <span>15 reviews</span>
                                    </div>
                                </div>
                                <div className="pt-[10px] text-gray-600">
                                    <p>
                                        Objectively productivate just in time information with dynamic channels.

                                        Energistically exploit seamless growth strategies after 24/7 experiences.
                                    </p>
                                </div>
                            </div>

                        </div>
                        <div className="bg-gray-100 w-full mt-[30px] px-[40px] py-[20px]">
                            <h4 className="font-bold">Add a review</h4>
                            <div className="grid grid-cols-4 gap-4 py-4">
                                <div>
                                    <div>
                                        <label>Services</label>
                                        <div>
                                            <Rate />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label>Locations</label>
                                        <div>
                                            <Rate />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label>Amenities</label>
                                        <div>
                                            <Rate />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label>Prices</label>
                                        <div>
                                            <Rate />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label>Room comfort and quality</label>
                                        <div>
                                            <Rate />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-[30px] grid grid-cols-2 gap-6">
                                <div>
                                    <input type="text" className="w-full h-[45px] rounded-lg outline-none px-5" />
                                </div>
                                <div>
                                    <input type="text" className="w-full h-[45px] rounded-lg outline-none px-5" />
                                </div>
                                <div className="col-span-2">
                                    <textarea rows={8} className="w-full rounded-lg p-5 outline-none" />
                                </div>
                                <div className="col-span-2">
                                    <button className="w-full p-3 bg-red-500 hover:bg-red-600 duration-300 text-white font-bold text-lg rounded-lg">Submit review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="sticky top-[50px] shadow-lg h-[300px] bg-white rounded-lg">
                        <div className="p-5 ">
                            <p className="text-xl">Price: </p>
                            <h2 className="text-2xl text-center py-[10px]"><span className="text-red-600 font-bold">{new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(data?.schedules[0]?.priceAdult)}</span>/Person</h2>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-xl">Departure:</span>
                                    <span className="text-base">
                                        {data?.destination}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-xl">Departure Date:</span>
                                    <span className="text-base">
                                        {dayjs(data?.departure).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                            </div>
                            {
                                showDetailTour ?
                                    <button className="w-full bg-red-600 text-white text-xl h-[50px] mt-[20px] rounded-lg">
                                        Book Tour
                                    </button>
                                    :
                                    <button onClick={scrollToCalendar} className="w-full bg-red-600 text-white text-xl h-[50px] mt-[20px] rounded-lg">
                                        Choose Departure Date
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-[40px] max-w-[1400px] mx-auto ">
                <h3 className="py-[20px] font-bold text-2xl">You may also like...</h3>
                <div className="pt-[10px] grid  gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        Array.from({ length: 4 }, (_, i) => {
                            return (
                                <div key={i} onClick={() => navigate('/')} className="overflow-hidden rounded cursor-pointer *:hover:text-gray-800 shadow-lg ">
                                    <img className="w-full h-[200px]" src={'https://cdnmedia.baotintuc.vn/Upload/XjfgEPYM30O8z6jY3MHxSw/files/2019/10/310/Anh%201_Cau%20Vang%20-%20Sun%20World%20Ba%20Na%20Hills.jpg'} alt="" />
                                    <div className="pt-3 pb-6 px-4 flex flex-col gap-2">
                                        <p className="text-gray-400">Budapest Hungary</p>
                                        <p className="font-bold text-base">
                                            Wonders of the Wesst Coast & Kimberley
                                        </p>
                                        <div className="border-b pb-[10px] flex items-center gap-5">
                                            <div className="py-1 bg-red-500 flex items-center *:text-white font-bold gap-2 px-2 w-[75px] rounded-lg">
                                                <Star />
                                                <span>4.8</span>
                                            </div>
                                            <span>15 reviews</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Starting From</span>
                                            <span>$520</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
