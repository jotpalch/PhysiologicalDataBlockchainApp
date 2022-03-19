package main

import (
	// "fmt"
    "github.com/gin-gonic/gin"
    "net/http"
	"gopkg.in/mgo.v2"
	// "gopkg.in/mgo.v2/bson" 
	// "gopls"
)

type IndexData struct {
	Title   string
	Content string
}


func test(c *gin.Context) {
	data := new(IndexData)
	data.Title = "首頁"
	data.Content = "我的第一個首頁"
	c.HTML(http.StatusOK, "index.html", data)
}

func main() {
	session, err := mgo.Dial("ec2-34-221-6-169.us-west-2.compute.amazonaws.com:27017")
	if err != nil {
		panic(err)
	}

	myDB := session.DB("admin")
	err = myDB.Login("admin", "69251")

	defer session.Close()

	server := gin.Default()
	server.SetTrustedProxies(nil)
	server.LoadHTMLGlob("template/*")
	server.GET("/", test)
	server.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })
	server.Run(":8877")
}
