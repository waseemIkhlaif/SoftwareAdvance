const connection = require("../../../config/db.js");

const notification = async (req, res) => {
    try {
        let sql ;
        console.log(req.user.role )
        if (req.user.role === 'gardener') {
            const userEmail = req.user.email;
            const sql11 = ` SELECT project_title, status  FROM collaboration WHERE user_email = ? `;
    
            connection.execute(sql11, [userEmail], (err, results) => {
                if (err) {
                    return res.status(500).json(err.stack);
                }
                // for task //
                if(results[0].status=='pending')return res.status(200).json(results);
                const sql5= `select * from task`
                connection.execute(sql5,(erre,reu)=>{
                    
                    const matchingObjects = reu.filter(obj2 =>
                        results.some(obj1 => obj1.project_title === obj2.Project_title)
                      );
                      console.log(results,matchingObjects)
                const concatenatedArray = results.concat(matchingObjects);
                console.log(concatenatedArray.length)
                if (concatenatedArray.length!=0)return res.json({ notification: concatenatedArray });
              
               else return res.json({message:"no notification"})
                
            })
                //end task 
            });
        }

        else if (req.user.role === 'volunteer') {
            sql = `SELECT up.*
            FROM collaboration up
            JOIN project p ON up.project_title = p.title
            WHERE up.status = 'pending'
            AND ( p.volunteer_email = ?
            )`;
    
           params = [req.user.email];
           connection.execute(sql, params,(err, result) => {
            if (err) {
                return res.json(err);
            }
           else if (result.length === 0) {
                return res.json({ notification: "No join request" });
            } else {
                return res.json({ notification: result });
            }
        });
        } 
        else {
            sql = `SELECT * FROM collaboration WHERE status='pending'` 
            connection.execute(sql, params,(err, result) => {
                if (err) {
                    return res.json(err);
                }
               else if (result.length === 0) {
                    return res.json({ notification: "No join request" });
                } else {
                    return res.json({ notification: result });
                }
            });
        }
    } catch (err) {
        return res.json(err.stack);
    }
};
const chooseStatus = async function(req, res) {
    try {
        if (req.user.role === 'gardner') {
            return res.status(401).json("You cannot access this page");
        }
        const { user_email, project_title, status } = req.body;
        const sql3 = `UPDATE collaboration SET status='${status}' WHERE user_email="${user_email}"`;

        connection.execute(sql3, (error, result) => {
            if (error) {
                return res.status(500).json({ error: error });
            }
            if (status === 'accept') {
                const sql5 = `SELECT NumofMem, size FROM project WHERE title ='${project_title}'`;

                connection.execute(sql5, (err, ress) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    }
                    if (ress[0].NumofMem + 1 === ress[0].size) {
                        const sql6 = `UPDATE project SET process_flow='started' WHERE title = '${project_title}'`;
                        connection.execute(sql6);
                    }
                });
                const sql4 = `UPDATE project SET NumofMem = NumofMem + 1 WHERE title = '${project_title}'`;
                connection.execute(sql4);
            }
            return res.status(200).json({ message: `${status} successfully` });
        });
    } catch (error) {
        return res.status(500).json(error.stack);
    }
};

module.exports = {notification,chooseStatus};
