import { CSSProperties } from "react";
import { BeerList } from "../../../services/beerService/types";

export type BeerItemData = {
    list: BeerList;
    setRowHeight: (index: number, size: number) => void;
};

export type BeerProps = {
    data: BeerItemData;
    index: number;
    style: CSSProperties;
};