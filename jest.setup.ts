import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

/* Corrige erro de `TextEncoder` em libs como react-router-dom */
import { TextEncoder, TextDecoder } from "util";
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
