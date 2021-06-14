const {
  Gender,
  Members,
  RelationShipTypes,
  RelationShips,
  InputKeys,
  ReponseMessages,
} = require("./constants");

module.exports = class FamilyTree {
  constructor(commands) {
    this.commands = commands;
    this.members = [...Members];

    this.relationShips = [...RelationShips];

    this.responses = [];
  }

  runCommands() {
    for (const command of this.commands) {
      const [commandType, ...restOfCommand] = command.split(" ");

      const response =
        commandType === InputKeys.addChild
          ? this.addChild(restOfCommand)
          : this.getRelationship(restOfCommand);

      this.responses.push(response);
    }

    return this.responses;
  }

  addChild([motherName, childName, gender]) {
    // validate input
    if (!motherName || !childName || !gender)
      return ReponseMessages.addChildError;

    // validate presence
    const mother = this.members.find((m) => m.name === motherName);
    if (!mother) return ReponseMessages.notFound;

    // validate gender
    if (mother.gender !== "Female") return ReponseMessages.addChildError;

    // validate duplicate member name
    const existingMember = this.members.find((m) => m.name === childName);
    if (existingMember) return ReponseMessages.addChildError;

    // validate spouse presence
    const spouseRelation = this.relationShips.find(
      (rs) =>
        rs.relationType === RelationShipTypes.spouse &&
        rs.relation.wife === mother.name
    );
    if (!spouseRelation) return ReponseMessages.addChildError;

    // push child to members list
    this.members.push({ name: childName, gender });

    // push relation ship
    this.relationShips.push({
      relationType:
        gender === Gender.Male
          ? RelationShipTypes.son
          : RelationShipTypes.daughter,
      relation: {
        father: spouseRelation.relation.husband,
        mother: spouseRelation.relation.mother,
        child: childName,
      },
    });

    return ReponseMessages.addChildSuccess;
  }

  getRelationship([name, relationShip]) {
    // check if member exist
    const member = this.members.find((m) => m.name === name);
    if (!member) return ReponseMessages.notFound;

    // call function based on relation ship
    switch (relationShip) {
      case InputKeys.son:
      case InputKeys.daughter:
        return this.getChild(
          member,
          RelationShipTypes[relationShip.toLowerCase()]
        );
      case InputKeys.siblings:
        return this.getSiblings(member);
      case InputKeys.sisterInLaw:
        return this.getInLaws(member, true);
      case InputKeys.brotherInLaw:
        return this.getInLaws(member, false);
      case InputKeys.paternalUncle:
        return this.getAuntsOrUncles(member, true, true);
      case InputKeys.maternalUncle:
        return this.getAuntsOrUncles(member, false, true);
      case InputKeys.paternalAunt:
        return this.getAuntsOrUncles(member, true, false);
      case InputKeys.maternalAunt:
        return this.getAuntsOrUncles(member, false, false);
    }

    return "Coming_soon";
  }

  getChild({ name, gender }, relationType) {
    const relatesTo = gender === Gender.Female ? "mother" : "father";
    const relationShips = this.relationShips.filter(
      (rs) =>
        rs.relationType === relationType && rs.relation[relatesTo] === name
    );
    if (!relationShips.length) return ReponseMessages.getRelationshipError;

    return relationShips.map((r) => r.relation.child).join(" ");
  }

  getSiblings({ name }) {
    const relationShip = this.relationShips.find(
      (rs) => rs.relation.child === name
    );

    if (!relationShip) return ReponseMessages.getRelationshipError;

    const siblings = this.relationShips.filter(
      (rs) =>
        rs.relation.father === relationShip.relation.father &&
        rs.relation.child !== name
    );

    if (!siblings.length) return ReponseMessages.getRelationshipError;

    return siblings.map((r) => r.relation.child).join(" ");
  }

  /**
   *
   * @param {Object} member
   * @param {string} member.name
   * @param {Boolean} isRelationTypePaternal
   * @param {Boolean} isRelationTypeUncle
   * @returns
   */
  getAuntsOrUncles({ name }, isRelationTypePaternal, isRelationTypeUncle) {
    // if isRelationTypePaternal is true then set parent as father else as mother
    const parentRelation = isRelationTypePaternal ? "father" : "mother";
    const parentRelationShip = this.relationShips.find(
      (rs) => rs.relation.child === name
    );

    if (!parentRelationShip) return ReponseMessages.getRelationshipError;
    const fathersParentRelationShip = this.relationShips.find(
      (rs) => rs.relation.child === parentRelationShip.relation[parentRelation]
    );

    if (!fathersParentRelationShip) return ReponseMessages.getRelationshipError;

    // if isRelationTypeUncle is true then set relationType as son else as daughter
    const relationType = isRelationTypeUncle
      ? RelationShipTypes.son
      : RelationShipTypes.daughter;
    const siblings = this.relationShips.filter(
      (rs) =>
        rs.relationType === relationType &&
        rs.relation.father === fathersParentRelationShip.relation.father &&
        rs.relation.child !== parentRelationShip.relation[parentRelation]
    );

    if (!siblings.length) return ReponseMessages.getRelationshipError;

    return siblings.map((r) => r.relation.child).join(" ");
  }

  /**
   * Fetch sister-in-laws or brother-in-laws
   * @param {Object} member
   * @param {string} member.name
   * @param {string} member.gender
   * @param {*} isRelationTypeSisters
   * @returns
   */
  getInLaws({ name, gender }, isRelationTypeSisters) {
    // find spouse's siblings (if isRelationTypeSisters is true then sisters else brothers)
    const spouseSiblings = this.fetchSpousesSiblings(
      name,
      gender,
      isRelationTypeSisters
    );

    // get sibling's spouses (if isRelationTypeSisters is true then brother's wives else sister's husbands)
    const siblingsSpouses = this.fetchSiblingsSpouses(
      name,
      !isRelationTypeSisters
    );

    const result = [...spouseSiblings, ...siblingsSpouses];

    return result.length
      ? result.join(" ")
      : ReponseMessages.getRelationshipError;
  }

  /**
   * fetch spouse's siblings (brothers or sisters)
   * @param {String} spouseName
   * @param {String} spouseGender
   * @param {Boolean} isFetchSisters
   * @returns Array
   */
  fetchSpousesSiblings(spouseName, spouseGender, isFetchSisters) {
    const spouseRelation = spouseGender === Gender.Female ? "wife" : "husband";
    const spouseRelationShip = this.relationShips.find(
      (rs) =>
        rs.relationType === RelationShipTypes.spouse &&
        rs.relation[spouseRelation] === spouseName
    );

    if (!spouseRelationShip) return [];

    const siblingRelation = spouseGender === Gender.Female ? "husband" : "wife";
    const spouseParentRelationShip = this.relationShips.find(
      (rs) => rs.relation.child === spouseRelationShip.relation[siblingRelation]
    );

    if (!spouseParentRelationShip) return [];

    const spouseSiblingRelationType = isFetchSisters
      ? RelationShipTypes.daughter
      : RelationShipTypes.son;
    const spouseSiblings = this.relationShips.filter(
      (rs) =>
        rs.relationType === spouseSiblingRelationType &&
        rs.relation.father === spouseParentRelationShip.relation.father &&
        rs.relation.child !== spouseRelationShip.relation[siblingRelation]
    );

    if (!spouseSiblings.length) return [];

    return spouseSiblings.map((r) => r.relation.child);
  }

  /**
   * Fetch sibling's spouses
   * @param {String} childName
   * @param {Boolean} isFetchSisters
   * @returns Array
   */
  fetchSiblingsSpouses(childName, isFetchSisters) {
    const parentRelationShip = this.relationShips.find(
      (rs) => rs.relation.child === childName
    );

    if (!parentRelationShip) return [];

    const siblingsRelationType = isFetchSisters
      ? RelationShipTypes.daughter
      : RelationShipTypes.son;

    const siblings = this.relationShips.filter(
      (rs) =>
        rs.relationType === siblingsRelationType &&
        rs.relation.father === parentRelationShip.relation.father &&
        rs.relation.child !== childName
    );

    if (!siblings.length) return [];

    const siblingNames = siblings.map((r) => r.relation.child);

    const [siblingRelation, spouseRelation] = isFetchSisters
      ? ["wife", "husband"]
      : ["husband", "wife"];

    const siblingRelationShips = this.relationShips.filter(
      (rs) =>
        rs.relationType === RelationShipTypes.spouse &&
        siblingNames.includes(rs.relation[siblingRelation])
    );

    return siblingRelationShips.map((r) => r.relation[spouseRelation]);
  }
};
