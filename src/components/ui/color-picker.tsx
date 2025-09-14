"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ColorPickerProps {
    value?: string;
    onChange?: (color: string) => void;
    showAlpha?: boolean;
    size?: "small" | "default" | "large";
    disabled?: boolean;
    predefine?: string[];
    colorFormat?: "hex" | "rgb" | "hsl" | "hsv";
    className?: string;
    placeholder?: string;
}

interface ColorObject {
    r: number;
    g: number;
    b: number;
    a: number;
}

// 색상 변환 유틸리티 함수들
const hexToRgb = (hex: string): ColorObject => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: 1,
        }
        : { r: 0, g: 0, b: 0, a: 1 };
};

const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    if (diff !== 0) {
        if (max === r) {
            h = ((g - b) / diff) % 6;
        } else if (max === g) {
            h = (b - r) / diff + 2;
        } else {
            h = (r - g) / diff + 4;
        }
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;

    const s = max === 0 ? 0 : diff / max;
    const v = max;

    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        v: Math.round(v * 100),
    };
};

const hsvToRgb = (h: number, s: number, v: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    v /= 100;

    const c = v * s;
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = v - c;

    let r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 1 / 6) {
        r = c;
        g = x;
        b = 0;
    } else if (1 / 6 <= h && h < 2 / 6) {
        r = x;
        g = c;
        b = 0;
    } else if (2 / 6 <= h && h < 3 / 6) {
        r = 0;
        g = c;
        b = x;
    } else if (3 / 6 <= h && h < 4 / 6) {
        r = 0;
        g = x;
        b = c;
    } else if (4 / 6 <= h && h < 5 / 6) {
        r = x;
        g = 0;
        b = c;
    } else if (5 / 6 <= h && h < 1) {
        r = c;
        g = 0;
        b = x;
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
    };
};

export function ColorPicker({
    value = "#409EFF",
    onChange,
    showAlpha = false,
    size = "default",
    disabled = false,
    predefine = [],
    colorFormat = "hex",
    className,
    placeholder = "색상을 선택하세요",
}: ColorPickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [color, setColor] = React.useState<ColorObject>(() => {
        if (value) {
            if (value.startsWith("#")) {
                return hexToRgb(value);
            } else if (value.startsWith("rgb")) {
                const matches = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (matches) {
                    return {
                        r: parseInt(matches[1]),
                        g: parseInt(matches[2]),
                        b: parseInt(matches[3]),
                        a: matches[4] ? parseFloat(matches[4]) : 1,
                    };
                }
            }
        }
        return { r: 64, g: 158, b: 255, a: 1 };
    });

    const [hsv, setHsv] = React.useState(() => rgbToHsv(color.r, color.g, color.b));
    const [hexInput, setHexInput] = React.useState(() => rgbToHex(color.r, color.g, color.b));

    React.useEffect(() => {
        const newColor = hexToRgb(value);
        setColor(newColor);
        setHsv(rgbToHsv(newColor.r, newColor.g, newColor.b));
        setHexInput(rgbToHex(newColor.r, newColor.g, newColor.b));
    }, [value]);

    const handleColorChange = (newColor: ColorObject) => {
        setColor(newColor);
        setHsv(rgbToHsv(newColor.r, newColor.g, newColor.b));
        setHexInput(rgbToHex(newColor.r, newColor.g, newColor.b));

        // 즉시 색상 변경 반영
        if (onChange) {
            if (colorFormat === "hex") {
                onChange(rgbToHex(newColor.r, newColor.g, newColor.b));
            } else if (colorFormat === "rgb") {
                onChange(
                    showAlpha
                        ? `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`
                        : `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`
                );
            }
        }
    };

    const handleHsvChange = (newHsv: { h: number; s: number; v: number }) => {
        setHsv(newHsv);
        const rgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
        handleColorChange({ ...rgb, a: color.a });
    };

    const handleHexInputChange = (hex: string) => {
        setHexInput(hex);
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            const newColor = hexToRgb(hex);
            handleColorChange({ ...newColor, a: color.a });
        }
    };

    const handleAlphaChange = (alpha: number) => {
        handleColorChange({ ...color, a: alpha / 100 });
    };

    const handlePredefineColorSelect = (predefineColor: string) => {
        if (predefineColor.startsWith("#")) {
            const newColor = hexToRgb(predefineColor);
            handleColorChange({ ...newColor, a: showAlpha ? color.a : 1 });
        }
        setIsOpen(false);
    };

    const sizeClasses = {
        small: "h-8 w-16 text-xs",
        default: "h-10 w-20 text-sm",
        large: "h-12 w-24 text-base",
    };

    const buttonSizeClasses = {
        small: "h-8 px-2",
        default: "h-10 px-3",
        large: "h-12 px-4",
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        buttonSizeClasses[size],
                        className
                    )}
                    disabled={disabled}
                >
                    <div
                        className={cn(
                            "mr-2 rounded border border-border shadow-sm",
                            size === "small" ? "h-4 w-4" : size === "large" ? "h-6 w-6" : "h-5 w-5"
                        )}
                        style={{
                            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                        }}
                    />
                    {value || placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-4">
                    {/* HSV Color Picker */}
                    <div className="space-y-3">
                        <div className="relative">
                            {/* Saturation/Value Picker */}
                            <div
                                className="relative h-40 w-full rounded border border-border cursor-crosshair hover:border-primary/50 transition-colors"
                                style={{
                                    background: `linear-gradient(to right, white, hsl(${hsv.h}, 100%, 50%)), linear-gradient(to top, black, transparent)`,
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                                    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
                                    const s = Math.round((x / rect.width) * 100);
                                    const v = Math.round(100 - (y / rect.height) * 100);
                                    handleHsvChange({ ...hsv, s, v });
                                }}
                                onMouseMove={(e) => {
                                    if (e.buttons === 1) {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                                        const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
                                        const s = Math.round((x / rect.width) * 100);
                                        const v = Math.round(100 - (y / rect.height) * 100);
                                        handleHsvChange({ ...hsv, s, v });
                                    }
                                }}
                            >
                                <div
                                    className="absolute h-3 w-3 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        left: `${hsv.s}%`,
                                        top: `${100 - hsv.v}%`,
                                    }}
                                />
                            </div>

                            {/* Hue Slider */}
                            <div className="mt-2">
                                <Label className="text-xs text-muted-foreground">Hue</Label>
                                <div
                                    className="relative h-4 w-full rounded border border-border cursor-pointer hover:border-primary/50 transition-colors"
                                    style={{
                                        background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                                        const h = Math.round((x / rect.width) * 360);
                                        handleHsvChange({ ...hsv, h });
                                    }}
                                    onMouseMove={(e) => {
                                        if (e.buttons === 1) {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                                            const h = Math.round((x / rect.width) * 360);
                                            handleHsvChange({ ...hsv, h });
                                        }
                                    }}
                                >
                                    <div
                                        className="absolute h-4 w-1 rounded border border-white shadow-lg transform -translate-x-1/2"
                                        style={{
                                            left: `${(hsv.h / 360) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Alpha Slider */}
                            {showAlpha && (
                                <div className="mt-2">
                                    <Label className="text-xs text-muted-foreground">Alpha</Label>
                                    <div className="relative">
                                        <div
                                            className="absolute inset-0 rounded border border-border"
                                            style={{
                                                backgroundImage: `
                          linear-gradient(45deg, #ccc 25%, transparent 25%),
                          linear-gradient(-45deg, #ccc 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, #ccc 75%),
                          linear-gradient(-45deg, transparent 75%, #ccc 75%)
                        `,
                                                backgroundSize: "8px 8px",
                                                backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
                                            }}
                                        />
                                        <div
                                            className="relative h-4 w-full rounded border border-border cursor-pointer hover:border-primary/50 transition-colors"
                                            style={{
                                                background: `linear-gradient(to right, transparent, rgba(${color.r}, ${color.g}, ${color.b}, 1))`,
                                            }}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                                                const alpha = Math.round((x / rect.width) * 100);
                                                handleAlphaChange(alpha);
                                            }}
                                            onMouseMove={(e) => {
                                                if (e.buttons === 1) {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
                                                    const alpha = Math.round((x / rect.width) * 100);
                                                    handleAlphaChange(alpha);
                                                }
                                            }}
                                        >
                                            <div
                                                className="absolute h-4 w-1 rounded border border-white shadow-lg transform -translate-x-1/2"
                                                style={{
                                                    left: `${color.a * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Color Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">HEX</Label>
                            <Input
                                value={hexInput}
                                onChange={(e) => handleHexInputChange(e.target.value)}
                                className="h-8 text-xs"
                                placeholder="#000000"
                            />
                        </div>
                        {showAlpha && (
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Alpha</Label>
                                <Input
                                    value={Math.round(color.a * 100)}
                                    onChange={(e) => handleAlphaChange(parseInt(e.target.value) || 0)}
                                    className="h-8 text-xs"
                                    placeholder="100"
                                    type="number"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        )}
                    </div>

                    {/* Predefined Colors */}
                    {predefine.length > 0 && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">사전 정의된 색상</Label>
                                <div className="grid grid-cols-8 gap-1">
                                    {predefine.map((predefineColor, index) => (
                                        <button
                                            key={index}
                                            className="h-6 w-6 rounded border border-border hover:scale-110 hover:border-primary/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                                            style={{ backgroundColor: predefineColor }}
                                            onClick={() => handlePredefineColorSelect(predefineColor)}
                                            title={predefineColor}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                        >
                            취소
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => setIsOpen(false)}
                        >
                            확인
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
