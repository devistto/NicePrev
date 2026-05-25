import { useState } from "react";
import { CustomDropdown } from "./dropdown"
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";

export const SideBarCompoent = () => {
    const [spacing, setSpacing] = useState(2);
    const [radius, setRadius] = useState(0);
    const [quality, setQuality] = useState(70);

    return (
        <div className="bg-zinc-800/70 w-[450px] h-full p-5 rounded-md flex flex-col text-white border border-zinc-800/80">

            <div>
                <h1 className="text-xl flex"><p className="text-blue-200">1</p>. Configurações de quadros</h1>
                <p></p>

                <div className="flex gap-x-7 justify-center mt-5 mb-3">
                    <div className="w-full flex flex-col">
                        <h2 className="mb-2">Esquema</h2>
                        <CustomDropdown data={[
                            { name: "2x2 - 4 quadros", value: "2x2" },
                            { name: "3x3 - 9 quadros", value: "3x3" },
                            { name: "4x4 - 16 quadros", value: "4x4" },
                            { name: "5x5 - 25 quadros", value: "5x5" }
                        ]} />
                    </div>

                    <div className="w-full flex flex-col justify-between">
                        <h2 className="">Espaçamento</h2>
                        <div className="flex gap-x-3 items-center">
                            <input type="range" min="0" max="10" step="1"
                                value={spacing}
                                onChange={(e) => setSpacing(Number(e.target.value))}
                                className="w-full"
                            />
                            <p className="px-3 w-20 flex justify-center py-1 text-xs border border-zinc-800">{spacing} <span className="text-zinc-500 ml-2">px</span></p>
                        </div>
                    </div>
                </div>

                <h3 className="mt-2 mb-3">Proporção</h3>
                <div className="flex justify-between w-full gap-x-2">

                    <div className="flex border border-zinc-800 py-1 px-6 items-center justify-center gap-x-2">
                        <p>auto</p>
                    </div>

                    <div className="flex border border-zinc-800 py-1 px-6 items-center justify-center gap-x-2">
                        <FaYoutube className="text-red-700" />
                        <p className="">16:9</p>
                    </div>

                    <div className="flex border border-zinc-800 py-1 px-6 items-center justify-center gap-x-2">
                        <FaTiktok />
                        <p className="">4:3</p>
                    </div>

                    <div className="flex border border-zinc-800 py-1 px-6 items-center justify-center gap-x-2">
                        <GrInstagram className="text-pink-300" />
                        <p>1:1</p>
                    </div>
                </div>
            </div>

            <div className="w-full h-[2px] mt-5 bg-zinc-800/70"></div>

            <div>
                <h1 className="text-xl mt-3 flex"><p className="text-blue-200">2</p>. Estilo de imagem</h1>

                <div className="mt-5 mb-3 flex w-full items-center">
                    <p className="w-full">Cores de fundo e texto:</p>
                    <div className="w-full flex">
                        <input
                            type="color"
                            className="h-7 w-full [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)] "
                        />
                        <input
                            type="color"
                            className="h-7 w-full -ml-3 [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]"
                        />
                    </div>
                </div>

                <div className="flex gap-x-7 justify-center mt-5 mb-3">
                    <div className="w-full flex flex-col">
                        <h2 className="mb-2">Fonte</h2>
                        <CustomDropdown data={[
                            { name: "Padrão", value: "" },
                            { name: "Ariaal", value: "Arial" }
                        ]} />
                    </div>

                    <div className="w-full flex flex-col justify-between">
                        <h2 className="">Curva</h2>
                        <div className="flex gap-x-3 items-center">
                            <input type="range" min="0" max="10" step="1"
                                value={radius}
                                onChange={(e) => setRadius(Number(e.target.value))}
                                className="w-full"
                            />
                            <p className="px-3 w-20 flex justify-center py-1 text-xs border border-zinc-800">{radius} <span className="text-zinc-500 ml-2">px</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-x-7 justify-center mt-5 mb-3">
                    <div className="w-full flex flex-col">
                        <h2 className="mb-2">Timestamps</h2>
                        <CustomDropdown data={[
                            { name: "Todos", value: "true" },
                            { name: "Nenhum", value: "false" }
                        ]} />
                    </div>

                    <div className="w-full flex flex-col">
                        <h2 className="mb-2">Metadados</h2>
                        <CustomDropdown data={[
                            { name: "Parcial", value: "1" },
                            { name: "Todos", value: "2" },
                            { name: "Nenhum", value: "3" }
                        ]} />
                    </div>
                </div>
            </div>

            <div className="w-full h-[2px] mt-3 bg-zinc-800/70"></div>

            <div className="flex flex-col mt-3 mb-3">
                <h1 className="text-xl flex"><p className="text-blue-200">3</p>. Saída</h1>

                <div className="flex gap-x-7 justify-center mt-5 mb-3">
                    <div className="w-full flex flex-col">
                        <h2 className="mb-2">Formato</h2>
                        <CustomDropdown data={[
                            { name: "PNG", value: "png" },
                            { name: "JPEG", value: "jpg" },
                            { name: "WEBP", value: "webp" }
                        ]} />
                    </div>

                    <div className="w-full flex flex-col justify-between">
                        <h2 className="">Qualidade</h2>
                        <div className="flex gap-x-3 items-center">
                            <input type="range" min="50" max="100" step="1"
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                className="w-full"
                            />
                            <p className="px-3 w-20 flex justify-center py-1 text-xs border border-zinc-800">{quality} <span className="text-zinc-500 ml-2">%</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <button className="w-full rounded-md p-3 mt-5 text-xl bg-blue-800/60 flex justify-center items-center gap-x-3">
            <MdOutlineFileDownload className="text-3xl"/>
                Gerar 
            </button>

        </div >
    )
}