package main

import (
	"context"
	"fmt"
	"log"
	"time"
	"os"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	client, err := ConnectToMongo()
	if err != nil {
		log.Fatal(err)
	}
	StartAPI(client)
}

func ConnectToMongo() (*mongo.Client, error) {
	for _, e := range os.Environ() {
        fmt.Println(e)
    }

	credential := options.Credential{
		Username:      os.Getenv("MONGO_USER"),
		Password:      os.Getenv("MONGO_PASS"),
	}
	const maxRetries = 10
	retryInterval := 5 * time.Second
	log.Println("Trying to connect to mongo")
	for i := 0; i < maxRetries; i++ {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		client, err := mongo.Connect(ctx, options.Client().ApplyURI(os.Getenv("MONGO_URL")).SetAuth(credential))
		if err == nil {
			return client, nil
		}
		log.Printf("Failed to connect to MongoDB. Retrying in %v...", retryInterval)
		time.Sleep(retryInterval)
	}

	return nil, fmt.Errorf("failed to connect to MongoDB after %v retries", maxRetries)
}

func StartAPI(client *mongo.Client) {
	router := gin.Default()

	tasksDB := client.Database("C214").Collection("tasks")

	router.GET("/tasks", func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		cursor, err := tasksDB.Find(ctx, bson.D{})
		if err != nil {
			log.Fatal(err)
		}
		defer cursor.Close(ctx)

		var tasks []bson.M
		if err := cursor.All(ctx, &tasks); err != nil {
			log.Fatal(err)
		}

		c.JSON(200, tasks)
	})

	router.POST("/tasks", func(c *gin.Context) {
		params := c.Request.URL.Query()
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if res, err := tasksDB.InsertOne(ctx,
			bson.D{
				{Key: "id", Value: params.Get("id")},
				{Key: "status", Value: params.Get("status")},
				{Key: "message", Value: params.Get("message")},
				{Key: "creation", Value: params.Get("creation")}}); err != nil {
			log.Fatal(err)
		} else {
			c.JSON(200, res)
		}
	})

	router.PUT("/tasks", func(c *gin.Context) {
		params := c.Request.URL.Query()
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if res, err := tasksDB.UpdateOne(ctx,
			bson.D{
				{Key: "id", Value: params.Get("id")}},
			bson.D{
				{Key: "$set", Value: bson.D{{Key: "status", Value: params.Get("status")}}},
			}); err != nil {
			log.Fatal(err)
		} else {
			c.JSON(200, res)
		}
	})

	router.DELETE("/tasks", func(c *gin.Context) {
		params := c.Request.URL.Query()
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if res, err := tasksDB.DeleteOne(ctx,
			bson.D{
				{Key: "id", Value: params.Get("id")}}); err != nil {
			log.Fatal(err)
		} else {
			c.JSON(200, res)
		}
	})

	router.DELETE("/tasks/all", func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if res, err := tasksDB.DeleteMany(ctx, bson.D{}); err != nil {
			log.Fatal(err)
		} else {
			c.JSON(200, res)
		}
	})
	router.Run()
}
