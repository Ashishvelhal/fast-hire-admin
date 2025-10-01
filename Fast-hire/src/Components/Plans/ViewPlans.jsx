import React, { useEffect, useState } from "react";
import { getAllPlans } from "./CreatePlans";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ViewPlans = ({ token, email, role }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await getAllPlans(token, email, role);
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography>Loading Plans...</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan) => {
          const discountedPrice = plan.price
            ? (
                plan.price -
                (plan.price * (plan.discountPercentage || 0)) / 100
              ).toFixed(0)
            : 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Card
                sx={{
                  borderRadius: "20px",
                  boxShadow: 5,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  ":hover": { transform: "translateY(-8px)", boxShadow: 8 },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  {plan.discountPercentage >= 30 && (
                    <Chip
                      label="Best Value"
                      color="primary"
                      sx={{ position: "absolute", top: 20, right: 20 }}
                    />
                  )}
                  <Typography variant="h6" fontWeight="bold">
                    {plan.name}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" mt={1}>
                    Valid for {plan.durationInMonths} months
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {plan.price === 0 ? (
                    <Typography
                      variant="h4"
                      color="success.main"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Free
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="h4" color="primary" fontWeight="bold">
                        ₹{discountedPrice}
                      </Typography>
                      {plan.discountPercentage > 0 && (
                        <Typography
                          variant="body2"
                          color="error"
                          gutterBottom
                        >
                          {plan.discountPercentage}% OFF (₹{plan.price})
                        </Typography>
                      )}
                    </>
                  )}

                  <Box mt={2} mb={2}>
                    <Typography display="flex" alignItems="center" justifyContent="center">
                      <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                      {plan.jobPostLimit} Job Posts
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    color={plan.price === 0 ? "primary" : "success"}
                    sx={{ mt: 2, py: 1.5, borderRadius: "12px", fontWeight: "bold" }}
                  >
                    {plan.price === 0 ? "Get Started" : "Buy Now"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ViewPlans;