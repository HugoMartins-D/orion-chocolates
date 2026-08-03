export type Flavor = {
  /** stable id, also used as the dictionary key elsewhere */
  id: string;
  /** giant display title, exactly as printed on the wrapper */
  name: string;
  /** two-line tagline under the nav */
  tagline: [string, string];
  /** page/background color for this flavor */
  bg: string;
  /** fill color of the two decorative blob shapes */
  blob: string;
  /** pagination dot colors */
  dotActive: string;
  dotInactive: string;
  /** product photo, already a transparent cutout — lives in /public/products */
  image: string;
};

// Order matches the flavor's intensity, from fruity/sweet to crunchy/bold —
// also the order flavors cycle through via drag / arrow keys.
export const flavors: Flavor[] = [
  {
    id: "passas",
    name: "PASSAS",
    tagline: ["ELEGANTE, MARCANTE", "E SURPREENDENTE."],
    bg: "#013969",
    blob: "#021a30",
    dotActive: "#021a30",
    dotInactive: "#0067bf",
    image: "/products/passas.png",
  },
  {
    id: "castanhas-de-caju",
    name: "CASTANHAS DE CAJU",
    tagline: ["CREMOSO, SUAVE", "E IRRESISTÍVEL."],
    bg: "#bb4c00",
    blob: "#622800",
    dotActive: "#622800",
    dotInactive: "#ff6c08",
    image: "/products/castanhas-de-caju.png",
  },
  {
    id: "ao-leite",
    name: "AO LEITE",
    tagline: ["SUAVE, DOCE", "E ACONCHEGANTE."],
    bg: "#532118",
    blob: "#3c120a",
    dotActive: "#3c120a",
    dotInactive: "#63362c",
    image: "/products/ao-leite.png",
  },
  {
    id: "meio-amargo",
    name: "MEIO AMARGO",
    tagline: ["INTENSO, EQUILIBRADO", "E INESQUECÍVEL."],
    bg: "#005e06",
    blob: "#024106",
    dotActive: "#024106",
    dotInactive: "#00940a",
    image: "/products/meio-amargo.png",
  },
  {
    id: "crocante",
    name: "CROCANTE",
    tagline: ["TEXTURA QUE SURPREENDE.", "SABOR QUE CONQUISTA."],
    bg: "#d01620",
    blob: "#8c0007",
    dotActive: "#8c0007",
    dotInactive: "#ff4a4a",
    image: "/products/crocante.png",
  },
];

/** shared blob silhouette, traced from the original Figma export */
export const BLOB_PATH =
  "M576.761 110.265C661.844 78.6554 737.247 -25.7769 822.298 5.91891C900.706 35.1392 880.487 157.537 911.901 235.161C941.574 308.482 987.507 371.749 1001.83 449.547C1021.18 554.6 1086.91 690.257 1009.17 763.438C928.215 839.651 792.605 767.045 682.801 749.875C614.307 739.164 559.793 685.339 490.532 682.336C385.474 677.78 281.284 770.324 184.878 728.282C86.9557 685.579 -25.4308 573.103 5.10378 470.645C41.4172 348.796 219.583 347.995 321.021 271.458C363.917 239.092 380.34 181.877 425.797 153.226C470.982 124.745 526.701 128.864 576.761 110.265Z";
export const BLOB_VIEWBOX = "0 0 1054.22 805.611";

export const SPRING = { type: "spring" as const, duration: 1.2, bounce: 0.24 };
