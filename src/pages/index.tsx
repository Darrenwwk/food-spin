import dynamic from 'next/dynamic';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface StyleType {
    backgroundColor?: string; // Optional
    textColor?: string; // Optional
    fontFamily?: string; // Optional
    fontSize?: number; // Optional
    fontWeight?: number | string; // Optional
    fontStyle?: string; // Optional
}

interface WheelData {
    option?: string;
    image?: ImageProps;
    style?: StyleType; // Optional
    optionSize?: number; // Optional
}

interface ImageProps {
    uri: string;
    offsetX?: number; // Optional
    offsetY?: number; // Optional
    sizeMultiplier?: number; // Optional
    landscape?: boolean; // Optional
}

const data: WheelData[] = [
    {
        option: '海底捞',
        style: { backgroundColor: '', textColor: 'black' },
    },
    { option: 'Sushi Mentai', style: { backgroundColor: 'white' } },
    { option: '鼎泰丰' },
    { option: 'bird bird' },
    { option: 'Mookata' },
    { option: 'Banana Bro' },
    { option: 'KFC' },
    { option: 'McDonald' },
    { option: 'Texas' },
    { option: 'Pizza Hut' },
    { option: 'Subway' },
    { option: '板面' },
    { option: 'Thai Food' },
    { option: '餐馆' },
    { option: '肉骨茶' },
    { option: '麻辣烫' },
    { option: 'Thong Kee' },
    { option: '咖啡店' },
    { option: '🐔饭' },
    { option: '点心' },
    { option: 'Mamak' },
    { option: 'Sungai Long Buffet' },
];

const Wheel = dynamic(() => import('react-custom-roulette').then((mod) => mod.Wheel), { ssr: false });

export default function Home() {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-white py-2">
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                onStopSpinning={() => {
                    setMustSpin(false);
                    toast.success('Today eat: ' + data[prizeNumber].option, {
                        position: 'bottom-center',
                        duration: 5000,
                        style: {
                            border: '1px solid green',
                            padding: '16px',
                            color: 'white',
                            backgroundColor: 'green',
                        },
                        iconTheme: {
                            primary: 'green',
                            secondary: 'white',
                        },
                    });
                }}
                fontWeight={500}
                fontSize={15}
            />
            <button onClick={handleSpinClick} className="text-white bg-black px-4 py-2 rounded-xl cursor-pointer hover:bg-green-500 duration-300">
                SPIN
            </button>
        </div>
    );
}
