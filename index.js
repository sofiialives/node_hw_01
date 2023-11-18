// console.log("Senior Full Stack Developer");

const contacts = require("./contacts");

const { program } = require("commander");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);

async function invokeAction({ id, name, email, phone, action }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const byId = await contacts.getContactById(id);
      console.table(byId);
      break;

    case "add":
      const added = await contacts.addContact(name, email, phone);
      console.table(added);
      break;

    case "update":
      const changes = await contacts.updateContact(id, name, email, phone);
      console.table(changes);
      break;

    case "remove":
      const deleted = await contacts.removeContact(id);
      console.table(deleted);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
// invokeAction({ action: "get", id: "1DEXoP8AuCGYc1YgoQ6hw" });
// const index = process.argv.indexOf("--action");
// if (index !== -1) {
//   const action = process.argv[index + 1];
//   invokeAction({ action });
// }
// invokeAction(argv);
