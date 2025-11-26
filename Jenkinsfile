
pipeline {
    agent any

    environment {
        REGISTRY = "docker.io/noblette"
        PROJECT = "sprayinfo"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')  // Ajout pour debug
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Images') {
            steps {
                script {
                    def services = ["user-service", "formation-service", "payment-service", "order-service"]

                    services.each { s ->
                        sh """
                        docker build -t $REGISTRY/$PROJECT-${s}:latest backend/${s}
                        """
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh """
                docker build -t $REGISTRY/$PROJECT-frontend:latest frontend
                """
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo \$PASS | docker login -u \$USER --password-stdin"
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    def services = ["user-service", "formation-service", "payment-service", "order-service"]
                    services.each { s ->
                        sh "docker push $REGISTRY/$PROJECT-${s}:latest"
                    }
                }
                sh "docker push $REGISTRY/$PROJECT-frontend:latest"
            }
        }

        stage('Deploy') {
            steps {
                sh """
                docker compose down || true
                docker compose pull
                docker compose up -d
                """
            }
        }
    }
}

