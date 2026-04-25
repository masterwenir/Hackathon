const OFFICIAL_NPS_MAPS = {
  "acadia-national-park": "https://www.nps.gov/acad/planyourvisit/images/ACADmap1-1.jpg?maxwidth=1300&autorotate=false",
  "yellowstone-national-park": "https://www.nps.gov/yell/planyourvisit/images/2023_YELL-GRTE-Tear-Off-Map_Web-Graphic_2.png?maxwidth=650&autorotate=false",
  "grand-canyon-national-park": "https://www.nps.gov/grca/planyourvisit/images/GRCAmap2_960x.jpg?maxwidth=1300&maxheight=1300&autorotate=false&format=webp",
  "yosemite-national-park": "https://www.nps.gov/yose/planyourvisit/upload/campgroundmap2013.jpg",
  "zion-national-park": "https://www.nps.gov/zion/planyourvisit/upload/Springdale-to-South-Entrance-Map-01.png",
  "hawaii-volcanoes-national-park": "https://www.nps.gov/havo/planyourvisit/images/National-Parks-on-Island-of-Hawai%CA%BBi-Map.jpg",
  "shenandoah-national-park": "https://www.nps.gov/shen/planyourvisit/images/SHEN_TrailMap_Small_WebGraphic.jpg?maxwidth=650&autorotate=false",
  "big-bend-national-park": "https://www.nps.gov/bibe/planyourvisit/images/imagemapgroupweb.jpg?maxwidth=650&autorotate=false"
};

function getOfficialNpsMapUrl(park){
  return OFFICIAL_NPS_MAPS[slugify(park.name)] || null;
}
