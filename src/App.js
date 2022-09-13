import { useEffect, useState } from "react";
import { TelegramClient } from "telegram";
import { signInUserWithQrCode } from "telegram/client/auth";
import { StringSession } from "telegram/sessions";
import ab2str from "arraybuffer-to-string";

import "./styles.css";
const apiId = 123213231;
const apiHash = "add API HASH";

const XD = () => {
  const runCode = async () => {
    const client = new TelegramClient(new StringSession(), apiId, apiHash);
    await client.connect();
    const user = await client.signInUserWithQrCode(
      { apiId, apiHash },
      {
        onError: async function (p1) {
          console.log("error", p1);
          // return true;a
        },
        qrCode: async (code) => {
          console.log(code);
          // console.log("Convert the next string to a QR code and scan it");
          // console.log(code.token.toString("base64url"));
          var u8 = new Uint8Array([65, 66, 67, 68]);
          console.log(code.token.toString("base64"));
          const answer = ab2str(code.token, "base64"); // 'SGVsbG
          console.log(answer);

          const urlLink = `tg://login?token=${code.token.toString("base64")}`;
          //convert url link to qr code
          console.log(urlLink);
        },
      }
    );

    // console.log(client.session.save());
    localStorage.setItem("saraToken", client.session.save());
    console.log(user);
    console.log("You should now be connected.");
  };

  return (
    <div>
      hello
      <button onClick={() => runCode()}>run code</button>
    </div>
  );
};

export default XD;
