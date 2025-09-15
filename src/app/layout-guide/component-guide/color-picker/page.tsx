import { ColorPicker } from "@/components/ui/color-picker";
import React from "react";

export default function ColorPickerPage() {
    return (
        <div className="container mx-auto py-8 space-y-12">
            <div>
                <h1 className="text-4xl font-bold mb-4">ColorPicker</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    다양한 색상 포맷을 지원하는 색상 선택기입니다.
                </p>
            </div>

            {/* Basic Usage */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">기본 사용법</h2>
                <p className="text-muted-foreground mb-6">
                    ColorPicker는 문자열 타입의 변수를 value로 바인딩해야 합니다.
                </p>
                <div className="p-6 border rounded-lg">
                    <ColorPickerBasic />
                </div>
            </section>

            {/* Alpha Channel */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Alpha 채널</h2>
                <p className="text-muted-foreground mb-6">
                    ColorPicker는 Alpha 채널 선택을 지원합니다. Alpha 선택을 활성화하려면 showAlpha 속성을 추가하세요.
                </p>
                <div className="p-6 border rounded-lg">
                    <ColorPickerAlpha />
                </div>
            </section>

            {/* Predefined Colors */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">사전 정의된 색상</h2>
                <p className="text-muted-foreground mb-6">
                    ColorPicker는 사전 정의된 색상 옵션을 지원합니다.
                </p>
                <div className="p-6 border rounded-lg">
                    <ColorPickerPredefine />
                </div>
            </section>

            {/* Sizes */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">크기</h2>
                <p className="text-muted-foreground mb-6">
                    다양한 크기의 ColorPicker를 제공합니다.
                </p>
                <div className="p-6 border rounded-lg">
                    <ColorPickerSizes />
                </div>
            </section>

            {/* Color Formats */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">색상 포맷</h2>
                <p className="text-muted-foreground mb-6">
                    다양한 색상 포맷을 지원합니다.
                </p>
                <div className="p-6 border rounded-lg">
                    <ColorPickerFormats />
                </div>
            </section>

            {/* Disabled */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">비활성화</h2>
                <p className="text-muted-foreground mb-6">
                    ColorPicker를 비활성화할 수 있습니다.
                </p>
                <div className="p-6 border rounded-lg">
                    <ColorPickerDisabled />
                </div>
            </section>
        </div>
    );
}

// Example Components
function ColorPickerBasic() {
    const [color1, setColor1] = React.useState("#409EFF");
    const [color2, setColor2] = React.useState("");

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium w-32">기본값이 있는 경우</span>
                <ColorPicker value={color1} onChange={setColor1} />
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium w-32">기본값이 없는 경우</span>
                <ColorPicker value={color2} onChange={setColor2} placeholder="색상을 선택하세요" />
            </div>
        </div>
    );
}

function ColorPickerAlpha() {
    const [color, setColor] = React.useState("rgba(19, 206, 102, 0.8)");

    return (
        <div className="flex items-center space-x-4">
            <span className="text-sm font-medium w-32">Alpha 채널</span>
            <ColorPicker
                value={color}
                onChange={setColor}
                showAlpha
            />
            <span className="text-sm text-muted-foreground">{color}</span>
        </div>
    );
}

function ColorPickerPredefine() {
    const [color, setColor] = React.useState("rgba(255, 69, 0, 0.68)");

    const predefineColors = [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "#c7158577",
    ];

    return (
        <div className="flex items-center space-x-4">
            <span className="text-sm font-medium w-32">사전 정의된 색상</span>
            <ColorPicker
                value={color}
                onChange={setColor}
                showAlpha
                predefine={predefineColors}
            />
            <span className="text-sm text-muted-foreground">{color}</span>
        </div>
    );
}

function ColorPickerSizes() {
    const [color, setColor] = React.useState("#409EFF");

    return (
        <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center space-y-2">
                <span className="text-xs text-muted-foreground">Large</span>
                <ColorPicker value={color} onChange={setColor} size="large" />
            </div>
            <div className="flex flex-col items-center space-y-2">
                <span className="text-xs text-muted-foreground">Default</span>
                <ColorPicker value={color} onChange={setColor} />
            </div>
            <div className="flex flex-col items-center space-y-2">
                <span className="text-xs text-muted-foreground">Small</span>
                <ColorPicker value={color} onChange={setColor} size="small" />
            </div>
        </div>
    );
}

function ColorPickerFormats() {
    const [hexColor, setHexColor] = React.useState("#409EFF");
    const [rgbColor, setRgbColor] = React.useState("rgb(64, 158, 255)");

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium w-32">HEX 포맷</span>
                <ColorPicker
                    value={hexColor}
                    onChange={setHexColor}
                    colorFormat="hex"
                />
                <span className="text-sm text-muted-foreground">{hexColor}</span>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-sm font-medium w-32">RGB 포맷</span>
                <ColorPicker
                    value={rgbColor}
                    onChange={setRgbColor}
                    colorFormat="rgb"
                />
                <span className="text-sm text-muted-foreground">{rgbColor}</span>
            </div>
        </div>
    );
}

function ColorPickerDisabled() {
    const [color, setColor] = React.useState("#409EFF");

    return (
        <div className="flex items-center space-x-4">
            <span className="text-sm font-medium w-32">비활성화</span>
            <ColorPicker
                value={color}
                onChange={setColor}
                disabled
            />
        </div>
    );
}
