package main

import (
	"fmt"
	"log"
    "github.com/gin-gonic/gin"
    "net/http"
	"context"
    "time"

    "go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo/options"
    // "go.mongodb.org/mongo-driver/mongo/readpref"
	// "gopls"
)

type IndexData struct {
	Title   string
	Content string
}

type data struct {
	DID_Public_Key     string    `json:"DID_Public_Key"`
	Blood_Oxygen       string    `json:"Blood_Oxygen"`
	Blood_Pressure     string    `json:"Blood_Pressure"`
	Body_Temperature   string    `json:"Body_Temperature"`
	Step_Counts        string    `json:"Step_Counts"`
	Heart_Beats 	   string 	 `json:"Heart_Beats"`
	Time_Stamp  	   string    `json:"Time_Stamp"`
}


func test(c *gin.Context) {
	data := new(IndexData)
	data.Title = "首頁"
	data.Content = "我的第一個首頁"
	c.HTML(http.StatusOK, "index.html", data)
}

func search(client *mongo.Client, col string, pk string) []*data{
	findOptions := options.Find()
	findOptions.SetLimit(288)

	collection := client.Database("users").Collection(col)

	var Userdata []*data

	cur, err := collection.Find(context.TODO(), bson.M{"DID_Public_Key": pk}, findOptions)
	if err != nil {
		panic(err)
	}

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var elem data
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}
	
		Userdata = append(Userdata, &elem)
	}

	cur.Close(context.TODO())

	return Userdata
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://admin:69251@ec2-34-221-6-169.us-west-2.compute.amazonaws.com:27017"))


	if err != nil {
		log.Fatal(err)
	}
	
	// Check the connection
	err = client.Ping(context.TODO(), nil)
	
	if err != nil {
		log.Fatal(err)
	}
	
	fmt.Println("Connected to MongoDB!")


	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	server := gin.Default()
	server.SetTrustedProxies(nil)
	server.LoadHTMLGlob("template/*")

	route(server, client)
	
	server.Run(":8877")
}

func route(server *gin.Engine, client *mongo.Client){
	server.GET("/", test)

	server.GET("/temp/:pk", temp(client) )
	server.GET("/step/:pk", step(client) )
	server.GET("/blood_ox/:pk", blood_ox(client) )
	server.GET("/blood_ps/:pk", blood_ps(client) )
	server.GET("/beats/:pk", beats(client) )
}

func temp(client *mongo.Client) gin.HandlerFunc{
	fn := func(c *gin.Context) {
        pk := c.Param("pk")
		Userdata := search(client, "Body_Temperature", pk)
		c.JSON(200, Userdata)
    }
    return gin.HandlerFunc(fn)
}
func step(client *mongo.Client) gin.HandlerFunc{
	fn := func(c *gin.Context) {
        pk := c.Param("pk")
		Userdata := search(client, "Step_Counts", pk)
		c.JSON(200, Userdata)
    }
    return gin.HandlerFunc(fn)
}
func blood_ox(client *mongo.Client) gin.HandlerFunc{
	fn := func(c *gin.Context) {
        pk := c.Param("pk")
		Userdata := search(client, "Blood_Oxygen", pk)
		c.JSON(200, Userdata)
    }
    return gin.HandlerFunc(fn)
}
func blood_ps(client *mongo.Client) gin.HandlerFunc{
	fn := func(c *gin.Context) {
        pk := c.Param("pk")
		Userdata := search(client, "Blood_Pressure", pk)
		c.JSON(200, Userdata)
    }
    return gin.HandlerFunc(fn)
}
func beats(client *mongo.Client) gin.HandlerFunc{
	fn := func(c *gin.Context) {
        pk := c.Param("pk")
		Userdata := search(client, "Heart_Beats", pk)
		c.JSON(200, Userdata)
    }
    return gin.HandlerFunc(fn)
}