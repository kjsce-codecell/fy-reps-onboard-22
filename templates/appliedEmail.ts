interface Data {
    email: string,
    name: string,
    registrationID: number
}

const format = (data: Data) => {
    const { email, name, registrationID } = data;

    return (
        `
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title> </title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
        a {
            color: blue;
        }

        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }

        h1 {
            text-align: center;
            color: #eee;
            font-family: sans-serif;
            font-size: 80px;
        }

        #timeline {
            position: relative;
            margin: 0 auto;
            left: 0;
            right: 0;
            width: 100%;
            max-width: 900px;
        }

        #timeline>div {
            width: 13px;
            height: 100%;
            position: absolute;
            color: #111115;

            z-index: -1;
            left: 37px;
        }

        #timeline section {
            display: flex;
            box-sizing: border-box;
            width: 100%;
            margin: 25px 0;
        }

        #timeline section div {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }

        #timeline section div img {
            margin: auto;
            height: 50px;
            width: 50px;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }

        #timeline section div:first-child {
            width: 90px;
            margin-right: 10px;
        }

        #timeline section div:last-child {
            width: 100%;
            padding: 30px 25px;
        }

        #timeline section h2,
        #timeline section h3 {
            margin: 0;
            color: #211c46;
            font-family: sans-serif;
            line-height: 1.3;
        }

        #timeline section h3 {
            margin-top: 15px;
            font-size: 18px;
        }

        @import url("https://fonts.googleapis.com/css?family=Finger+Paint&display=swap");
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width: 480px) {
            @-ms-viewport {
                width: 320px;
            }

            @viewport {
                width: 320px;
            }
        }
    </style>
    <link rel="stylesheet" text="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.css" />
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css" />
    <style type="text/css">
        @import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.css);
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    </style>
    <style type="text/css">
        @media only screen and (min-width: 480px) {
            .mj-column-per-80 {
                width: 80% !important;
            }

            .mj-column-per-100 {
                width: 100% !important;
            }
        }

        .mj-column-per-20 {
            width: 20% !important;
        }
    </style>
    <style type="text/css">
        .float {
            margin-top: 5px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                0 6px 20px 0 rgba(0, 0, 0, 0.19);

            width: 90%;
        }

        .footer {
            width: 80%;
        }

        .hack {
            font-size: 30px;
        }

        .hi {
            font-size: 22px;
        }

        @media only screen and (max-width: 700px) {
            .hack {
                font-size: 20px;
            }

            .hi {
                font-size: 18px;
            }
        }
    </style>
</head>

<body style="/* background-color:#010924f6; */">
    <div style="
        background-image: url('http://def-webapps.surge.sh/bg.png');
        background-color: #000000;
        background-position: center;
        background-size: 25vh;
        padding-bottom: 25px;
        background-repeat: repeat;
      ">
        <div style="
          margin: 0px auto;
          width: 90%;
          max-width: 600px; /* box-shadow: 0px 0px 50px #303030; */
        ">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
                <tbody>
                    <tr>
                        <td style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  text-align: center;
                  vertical-align: top;
                "></td>
                    </tr>
                    <tr>
                        <td style="/* width:350px; */">
                            <div style="
                    /* width: 90%; */
                    margin: auto;
                    box-shadow: 0px 0px 50px #292929;
                  ">
                                <img height="auto" src="http://def-webapps.surge.sh/logo.png" style="
                      border: 0;
                      display: block;
                      outline: none;
                      text-decoration: none;
                      height: auto;
                      width: 100%;
                    " width="100%" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="float" style="
          background: rgb(255, 255, 255);
          background-color: rgb(255, 255, 255);
          margin: 0px auto;
          max-width: 600px;
          z-index: 99;
          box-shadow: 0px 0px 50px #5f5f5f;
        ">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="
            background: rgb(255, 255, 255);
            background-color: rgb(255, 255, 255);
          ">
                <tbody>
                    <tr>
                        <td style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  text-align: center;
                  vertical-align: top;
                ">
                            <div class="mj-column-per-80 outlook-group-fix" style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  ">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="vertical-align: top" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="left" style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          ">
                        
                                              
                                                <div style="
                              font-family: Arial, Helvetica, sans-serif;
                              font-size: 15px;
                              line-height: 1.4;
                              text-align: left;
                              color: #080808;
                            ">
                                                    <br />
                                                    <br />
                                                    <span style="font-size: 18px; font-weight: bolder">
                                                        <b>
                                                            🎊Hurrayyy!! This Email is to confirm your Application for KJSCE CodeCell 2022-23🎊
                                                            <br /><br /><small>
                                                            This is what we received,<br />
                                                            Email ID: ${email} <br />
                                                            Name: ${name} <br />
                                                            Registration ID: ${registrationID} <br/></small>
                                                        </b>
                                                    </span>
                                                    <br>
                                                    There will be a screening process before the interview. So if the entered details are not 
                                                    correct, please contact us immediately with an Email to this <a href="mailto:codecell.engg@somaiya.edu">codecell.engg@somaiya.edu</a>
                                                    <br><br>

                                                  
                                                

                                                
                                                   
                                                    For any queries, feel free to contact 📞:<br>
                                                    Hardik: +91 9321012106<br>
                                                    Rahil: +91 9920828960<br>
                                                    <br />
                                                    <br />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" vertical-align="middle" style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          ">
                                                <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                    role="presentation"
                                                    style="border-collapse: separate; line-height: 100%">
                                                    <tbody>
                                                        <tr></tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          ">
                                                <div style="
                              font-family: 'Courier New', Courier, monospace;
                              font-size: 15px;
                              line-height: 1;
                              text-align: center;
                              color: #555;
                              font-weight: bold;
                            ">
                                                    Thanks, KJSCE CodeCell
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer" style="
          margin: 0px auto;
          max-width: 600px;
          background-color: #080808;
          padding-bottom: 25px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
                <tbody>
                    <tr>
                        <td style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-bottom: 0;
                  text-align: center;
                  vertical-align: top;
                ">
                            <div class="mj-column-per-20 outlook-group-fix" style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  ">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="vertical-align: top" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="
                            font-size: 0px;
                            padding: 5px 5px;
                            word-break: break-word;
                          ">
                            <div style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 25px;
                              line-height: 1;
                              text-align: center;
                              color: white;
                            ">
                                                    <a href="https://www.facebook.com/kjscecodecell/"
                                                        target="_blank"><img width="25px"
                                                            src="https://kjscehackmails.surge.sh/facebook.png"/></a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mj-column-per-20 outlook-group-fix" style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  ">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="vertical-align: top" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="
                            font-size: 0px;
                            padding: 5px 5px;
                            word-break: break-word;
                          ">
                                                <div style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 25px;
                              line-height: 1;
                              text-align: center;
                              color: white;
                            ">
                                                    <a href="https://www.instagram.com/kjsce_codecell/?hl=en"
                                                        target="_blank"><img width="25px"
                                                            src="https://kjscehackmails.surge.sh/instagram.png" /></a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mj-column-per-20 outlook-group-fix" style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  ">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="vertical-align: top" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="
                            font-size: 0px;
                            padding: 5px 5px;
                            word-break: break-word;
                          ">
                                                <div style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 25px;
                              line-height: 1;
                              text-align: center;
                              color: white;
                            ">
                                                    <a href="https://twitter.com/kjsce_codecell?lang=en"
                                                        target="_blank"><img width="25px"
                                                            src="https://kjscehackmails.surge.sh/twitter.png" /></a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mj-column-per-20 outlook-group-fix" style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  ">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="vertical-align: top" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="
                            font-size: 0px;
                            padding: 5px 5px;
                            word-break: break-word;
                          ">
                                                <div style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 25px;
                              line-height: 1;
                              text-align: center;
                              color: white;
                            ">
                                                    <a href="https://github.com/KJSCE-Codecell" target="_blank"><img
                                                            width="25px"
                                                            src="https://kjscehackmails.surge.sh/github.png" /></a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="mj-column-per-20 outlook-group-fix" style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  ">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="vertical-align: top" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="
                            font-size: 0px;
                            padding: 5px 5px;
                            word-break: break-word;
                          ">
                                                <div style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 25px;
                              line-height: 1;
                              text-align: center;
                              color: white;
                            ">
                                                    <a href="https://www.kjscecodecell.com" target="_blank"><img
                                                            width="25px"
                                                            src="http://pnghack.surge.sh/assets/web.png" /></a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="margin: 0px auto; max-width: 600px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
                <tbody>
                    <tr>
                        <td style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-top: 0;
                  text-align: center;
                  vertical-align: top;
                ">
                            <div class="mj-column-per-100 outlook-group-fix" style="
                    font-size: 13px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  ">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="vertical-align: top" width="100%">
                                    <tbody>
                                        <tr>
                                            <td align="center"
                                                style="font-size:0px;padding:10px 25px;word-break:break-word;color">
                                                <div style="
                              font-family: Ubuntu, Helvetica, Arial, sans-serif;
                              font-size: 13px;
                              line-height: 1;
                              text-align: center;
                              color: white;
                            ">
                                                    Copyright © KJSCE CodeCell, All rights reserved.
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>

</html>

        `
    )
}

export default format;
