const Gender = { Male: "Male", Female: "Female" };

const Members = [
  { name: "Shan", gender: Gender.Male },
  { name: "Anga", gender: Gender.Female },
  { name: "Chit", gender: Gender.Male },
  { name: "Amba", gender: Gender.Female },
  { name: "Dritha", gender: Gender.Female },
  { name: "Jaya", gender: Gender.Male },
  { name: "Yodhan", gender: Gender.Male },
  { name: "Tritha", gender: Gender.Female },
  { name: "Vritha", gender: Gender.Male },
  { name: "Ish", gender: Gender.Male },
  { name: "Vich", gender: Gender.Male },
  { name: "Lika", gender: Gender.Female },
  { name: "Vila", gender: Gender.Female },
  { name: "Chika", gender: Gender.Female },
  { name: "Aras", gender: Gender.Male },
  { name: "Chitra", gender: Gender.Female },
  { name: "Ahit", gender: Gender.Male },
  { name: "Jnki", gender: Gender.Female },
  { name: "Arit", gender: Gender.Male },
  { name: "Laki", gender: Gender.Male },
  { name: "Lavnya", gender: Gender.Female },
  { name: "Satya", gender: Gender.Female },
  { name: "Vyan", gender: Gender.Male },
  { name: "Asva", gender: Gender.Male },
  { name: "Satvy", gender: Gender.Female },
  { name: "Vasa", gender: Gender.Male },
  { name: "Vyas", gender: Gender.Male },
  { name: "Krpi", gender: Gender.Female },
  { name: "Kriya", gender: Gender.Male },
  { name: "Krithi", gender: Gender.Female },
  { name: "Atya", gender: Gender.Female },
];

const RelationShipTypes = { spouse: 1, son: 2, daughter: 3 };

const RelationShips = [
  {
    relationType: RelationShipTypes.spouse,
    relation: { husband: "Shan", wife: "Anga" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Shan", mother: "Anga", child: "Chit" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Shan", mother: "Anga", child: "Ish" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Shan", mother: "Anga", child: "Vich" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Shan", mother: "Anga", child: "Aras" },
  },
  {
    relationType: RelationShipTypes.daughter,
    relation: { father: "Shan", mother: "Anga", child: "Satya" },
  },
  {
    relationType: RelationShipTypes.spouse,
    relation: { husband: "Chit", wife: "Amba" },
  },
  {
    relationType: RelationShipTypes.daughter,
    relation: { father: "Chit", mother: "Amba", child: "Dritha" },
  },
  {
    relationType: RelationShipTypes.daughter,
    relation: { father: "Chit", mother: "Amba", child: "Tritha" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Chit", mother: "Amba", child: "Vritha" },
  },
  {
    relationType: RelationShipTypes.spouse,
    relation: { husband: "Jaya", wife: "Dritha" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Jaya", mother: "Dritha", child: "Yodhan" },
  },
  {
    relationType: RelationShipTypes.spouse,
    relation: { husband: "Vich", wife: "Lika" },
  },
  {
    relationType: RelationShipTypes.daughter,
    relation: { father: "Vich", mother: "Lika", child: "Vila" },
  },
  {
    relationType: RelationShipTypes.daughter,
    relation: { father: "Vich", mother: "Lika", child: "Chika" },
  },
  {
    relationType: RelationShipTypes.spouse,
    relation: { husband: "Aras", wife: "Chitra" },
  },
  {
    relationType: RelationShipTypes.daughter,
    relation: { father: "Aras", mother: "Chitra", child: "Jnki" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Aras", mother: "Chitra", child: "Ahit" },
  },
  {
    relationType: RelationShipTypes.spouse,
    relation: { husband: "Arit", wife: "Jnki" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Arit", mother: "Jnki", child: "Laki" },
  },
  {
    relationType: RelationShipTypes.daughter,
    relation: { father: "Arit", mother: "Jnki", child: "Lavnya" },
  },
  {
    relationType: RelationShipTypes.spouse,
    relation: { husband: "Vyan", wife: "Satya" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Vyan", mother: "Satya", child: "Asva" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Vyan", mother: "Satya", child: "Vyas" },
  },
  {
    relationType: RelationShipTypes.daughter,
    relation: { father: "Vyan", mother: "Satya", child: "Atya" },
  },
  {
    relationType: RelationShipTypes.spouse,
    relation: { husband: "Asva", wife: "Satvy" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Asva", mother: "Satvy", child: "Vasa" },
  },
  {
    relationType: RelationShipTypes.spouse,
    relation: { husband: "Vyas", wife: "Krpi" },
  },
  {
    relationType: RelationShipTypes.son,
    relation: { father: "Vyas", mother: "Krpi", child: "Kriya" },
  },
  {
    relationType: RelationShipTypes.daughter,
    relation: { father: "Vyas", mother: "Krpi", child: "Krithi" },
  },
];

const InputKeys = {
  addChild: "ADD_CHILD",
  getRelationship: "GET_RELATIONSHIP",
  paternalUncle: "Paternal-Uncle",
  maternalUncle: "Maternal-Uncle",
  paternalAunt: "Paternal-Aunt",
  maternalAunt: "Maternal-Aunt",
  sisterInLaw: "Sister-In-Law",
  brotherInLaw: "Brother-In-Law",
  son: "Son",
  daughter: "Daughter",
  siblings: "Siblings",
};

const ReponseMessages = {
  notFound: "PERSON_NOT_FOUND",
  addChildSuccess: "CHILD_ADDITION_SUCCEEDED",
  addChildError: "CHILD_ADDITION_FAILED",
  getRelationshipError: "NONE",
};

module.exports = Object.freeze({
  Gender,
  Members,
  RelationShipTypes,
  RelationShips,
  InputKeys,
  ReponseMessages,
});
