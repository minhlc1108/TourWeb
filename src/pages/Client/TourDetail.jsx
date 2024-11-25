import { Button, Calendar, DatePicker, Rate } from "antd";
import { ChevronRight, CircleCheck, CircleX, Minus, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTourByIdAPI } from "~/apis";

export default function TourDetail() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [active, setActive] = useState(0)
    const [countAdults, setCountAdults] = useState(0)
    const [countChildren, setCountChildren] = useState(0)
    const navigate = useNavigate()
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const getTour = () => {
        getTourByIdAPI(id).then((data) => {
            setData(data)
        })
    }

    useEffect(() => {
        if (id) getTour();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        setCountAdults(value);
    };
    const handleChangeChildren = (e) => {
        const value = parseInt(e.target.value);
        setCountAdults(value);
    };

    return (
        <div className="py-8">
            <div className="max-w-[1400px] mx-auto gap-8 grid grid-cols-7">
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
                        <div>
                            <Calendar onPanelChange={onPanelChange} />
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
                <div className="bg-gray-100 px-4 py-4 flex flex-col gap-8 col-span-2 h-[670px] shadow-lg">
                    <div className="w-full border-b py-[30px] gap-1 flex justify-center items-center ">
                        <h3 className="font-bold text-3xl">$104</h3>
                        <span>/</span>
                        <span>per person</span>
                    </div>
                    <div className="border-b">
                        <div className="flex flex-col gap-3">
                            <label className="font-bold">Date</label>
                            <DatePicker showTime />
                        </div>
                        <div className="flex flex-col gap-8 mt-[50px] pb-[50px]">
                            <span className="font-bold">Ticket</span>
                            <div className="flex items-center w-full justify-between">
                                <label>Adults (18+ years)</label>
                                <div className="flex items-center gap-1 *:text-gray-600">
                                    <Button
                                        onClick={() => setCountAdults((prev) => Math.max(prev - 1, 0))} 
                                        className="w-[30px] h-[30px] px-0"
                                    >
                                        <Minus size={30} />
                                    </Button>
                                    <input
                                        type="number"
                                        value={countAdults}
                                        onChange={handleChange}
                                        className=" rounded-md w-[45px] border h-[30px] text-center"
                                        min={0}
                                    />
                                    <Button
                                        onClick={() => setCountAdults((prev) => prev + 1)}
                                        className="w-[30px] h-[30px] px-0"
                                    >
                                        <Plus />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center w-full justify-between">
                                <label>Children</label>
                                <div className="flex items-center gap-1 *:text-gray-600">
                                    <Button
                                        onClick={() => setCountChildren((prev) => Math.max(prev - 1, 0))} 
                                        className="w-[30px] h-[30px] px-0"
                                    >
                                        <Minus size={30} />
                                    </Button>
                                    <input
                                        type="number"
                                        value={countChildren}
                                        onChange={handleChangeChildren}
                                        className=" rounded-md w-[45px] border h-[30px] text-center"
                                        min={0}
                                    />
                                    <Button
                                        onClick={() => setCountChildren((prev) => prev + 1)}
                                        className="w-[30px] h-[30px] px-0"
                                    >
                                        <Plus />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-14">
                        <div className="w-full flex items-center justify-between">
                            <span className="font-bold">Total</span>
                            <span className="text-red-600 text-2xl font-bold">$104</span>
                        </div>
                        <div className="w-full px-3">
                            <button className="rounded w-full h-[45px] bg-red-500 hover:bg-red-600 duration-300 text-white font-bold">Book now</button>
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
