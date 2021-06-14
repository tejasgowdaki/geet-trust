const FamilyTree = require("../family");
const { fetchInputFromFile } = require("../utils");

const { ReponseMessages } = require("../constants");

describe("Family", () => {
  describe("fetchInputFromFile", () => {
    test("Expect to return input commands", () => {
      const messages = fetchInputFromFile("__tests__/example.txt");
      expect(messages.length).toEqual(2);
    });
  });

  describe("FamilyTree - ADD_CHILD", () => {
    test("Expect success response for ADD_CHILD", () => {
      const result = new FamilyTree([
        "ADD_CHILD Chitra Aria Female",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.addChildSuccess);
    });

    test("Expect person not found response for ADD_CHILD", () => {
      const result = new FamilyTree([
        "ADD_CHILD Pjali Srutak Male",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.notFound);
    });

    test("Expect failure response for ADD_CHILD when trying to add child for male", () => {
      const result = new FamilyTree([
        "ADD_CHILD Asva Vani Female",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.addChildError);
    });

    test("Expect failure response for ADD_CHILD when trying to add child where name already present", () => {
      const result = new FamilyTree([
        "ADD_CHILD Chitra Ish Female",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.addChildError);
    });
  });

  describe("FamilyTree - GET_RELATIONSHIP - Son", () => {
    test("Expect failure response for GET_RELATIONSHIP - Son when person not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Pjali Son",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.notFound);
    });

    test("Expect failure response for GET_RELATIONSHIP - Son when son not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Vritha Son",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect success response for GET_RELATIONSHIP - Son", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Chit Son",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual("Vritha");
    });
  });

  describe("FamilyTree - GET_RELATIONSHIP - Daughter", () => {
    test("Expect failure response for GET_RELATIONSHIP - Daughter when person not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Pjali Daughter",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.notFound);
    });

    test("Expect failure response for GET_RELATIONSHIP - Daughter when daughter not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Vritha Daughter",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect success response for GET_RELATIONSHIP - Daughter", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Aras Daughter",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual("Jnki");
    });
  });

  describe("FamilyTree - GET_RELATIONSHIP - Siblings", () => {
    test("Expect failure response for GET_RELATIONSHIP - Siblings when person not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Pjali Siblings",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.notFound);
    });

    test("Expect failure response for GET_RELATIONSHIP - Siblings when parent's relation not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Shan Siblings",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect success response for GET_RELATIONSHIP - Siblings", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Vila Siblings",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual("Chika");
    });
  });

  describe("FamilyTree - GET_RELATIONSHIP - Paternal-Uncle", () => {
    test("Expect failure response for GET_RELATIONSHIP - Paternal-Uncle when person not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Pjali Paternal-Uncle",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.notFound);
    });

    test("Expect failure response for GET_RELATIONSHIP - Paternal-Uncle when parent's relation not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Shan Paternal-Uncle",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect failure response for GET_RELATIONSHIP - Paternal-Uncle when grand-parent's relation not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Ish Paternal-Uncle",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect failure response for GET_RELATIONSHIP - Paternal-Uncle when uncles not present", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Asva Paternal-Uncle",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect success response for GET_RELATIONSHIP - Paternal-Uncle", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Vasa Paternal-Uncle",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual("Vyas");
    });
  });

  describe("FamilyTree - GET_RELATIONSHIP - Maternal-Uncle", () => {
    test("Expect failure response for GET_RELATIONSHIP - Maternal-Uncle when person not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Pjali Maternal-Uncle",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.notFound);
    });

    test("Expect failure response for GET_RELATIONSHIP - Maternal-Uncle when parent's relation not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Shan Maternal-Uncle",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect failure response for GET_RELATIONSHIP - Maternal-Uncle when grand-parent's relation not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Ish Maternal-Uncle",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect failure response for GET_RELATIONSHIP - Maternal-Uncle when uncles not present", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Ahit Maternal-Uncle",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect success response for GET_RELATIONSHIP - Maternal-Uncle", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Yodhan Maternal-Uncle",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual("Vritha");
    });
  });

  describe("FamilyTree - GET_RELATIONSHIP - Paternal-Aunt", () => {
    test("Expect failure response for GET_RELATIONSHIP - Paternal-Aunt when person not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Pjali Paternal-Aunt",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.notFound);
    });

    test("Expect failure response for GET_RELATIONSHIP - Paternal-Aunt when parent's relation not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Shan Paternal-Aunt",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect failure response for GET_RELATIONSHIP - Paternal-Aunt when grand-parent's relation not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Ish Paternal-Aunt",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect failure response for GET_RELATIONSHIP - Paternal-Aunt when Aunt not present", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Asva Paternal-Aunt",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect success response for GET_RELATIONSHIP - Paternal-Aunt", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Ahit Paternal-Aunt",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual("Satya");
    });
  });

  describe("FamilyTree - GET_RELATIONSHIP - Maternal-Aunt", () => {
    test("Expect failure response for GET_RELATIONSHIP - Maternal-Aunt when person not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Pjali Maternal-Aunt",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.notFound);
    });

    test("Expect failure response for GET_RELATIONSHIP - Maternal-Aunt when parent's relation not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Shan Maternal-Aunt",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect failure response for GET_RELATIONSHIP - Maternal-Aunt when grand-parent's relation not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Ish Maternal-Aunt",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect failure response for GET_RELATIONSHIP - Maternal-Aunt when Aunt not present", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Asva Maternal-Aunt",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect success response for GET_RELATIONSHIP - Maternal-Aunt", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Yodhan Maternal-Aunt",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual("Tritha");
    });
  });

  describe("FamilyTree - GET_RELATIONSHIP - Sister-In-Law", () => {
    test("Expect failure response for GET_RELATIONSHIP - Sister-In-Law when person not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Pjali Sister-In-Law",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.notFound);
    });

    test("Expect failure response for GET_RELATIONSHIP - Sister-In-Law when Spouse’s sisters not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Dritha Sister-In-Law",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect failure response for GET_RELATIONSHIP - Sister-In-Law when Wives of siblings not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Dritha Sister-In-Law",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect success response for GET_RELATIONSHIP - Sister-In-Law", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Amba Sister-In-Law",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual("Satya");
    });
  });

  describe("FamilyTree - GET_RELATIONSHIP - Brother-In-Law", () => {
    test("Expect failure response for GET_RELATIONSHIP - Brother-In-Law when person not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Pjali Brother-In-Law",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.notFound);
    });

    test("Expect failure response for GET_RELATIONSHIP - Brother-In-Law when Spouse’s brothers not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Jnki Brother-In-Law",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect failure response for GET_RELATIONSHIP - Brother-In-Law when Husbands of siblings not found", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Dritha Brother-In-Law",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(ReponseMessages.getRelationshipError);
    });

    test("Expect success response for GET_RELATIONSHIP - Brother-In-Law", () => {
      const result = new FamilyTree([
        "GET_RELATIONSHIP Ahit Brother-In-Law",
      ]).runCommands();
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual("Arit");
    });
  });
});
